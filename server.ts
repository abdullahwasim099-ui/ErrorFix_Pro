import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

// We use express.json() with a larger limit for image uploads
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const PORT = 3000;
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Chatbot API Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { history, message } = req.body;
    
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-3.6-flash", // We use 3.6-flash to support Google Search Grounding properly
      config: {
        systemInstruction: "You are an AI Tech Support Assistant for ErrorFix Pro. Answer questions exclusively about fixing Windows errors, CMD/PowerShell diagnostics, and PC troubleshooting. Do not answer questions outside this domain. Keep your answers concise, practical, and helpful.",
        tools: [{ googleSearch: {} }] // Enable Google Search Grounding
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message: message });
    
    // Extract grounding chunks for citations
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const citations = chunks.map((chunk: any) => chunk.web).filter(Boolean);

    res.json({ text: response.text, citations });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Image Analysis API Endpoint
app.post("/api/gemini/analyze-image", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: imageBase64,
      },
    };
    
    const textPart = {
      text: "Analyze this image. It is likely a screenshot of a Windows error code or BSOD. Extract ONLY the exact error code string (e.g. '0x80070005' or 'CRITICAL_PROCESS_DIED'). Do not include any other text in your response. If you don't find a Windows error code, respond with 'UNKNOWN'.",
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview", // Use Pro for complex image analysis
      contents: { parts: [imagePart, textPart] },
    });

    const errorCode = response.text ? response.text.trim() : 'UNKNOWN';
    res.json({ errorCode });
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express 5 wildcard routing
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
