import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icons.jsx';
import ReactMarkdown from 'react-markdown';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm your AI Tech Support Assistant. Describe your Windows error or PC issue, and I'll help you troubleshoot." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    // We don't include the first welcome message in the API history to save tokens
    const history = messages.slice(1);
    
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, message: userMsg }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      setMessages([...newMessages, { role: 'model', text: data.text, citations: data.citations }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: 'model', text: "**Error**: Failed to connect to the AI assistant. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}
      >
        {isOpen ? <Icon.X style={{ width: 24, height: 24 }} /> : <Icon.Bug style={{ width: 24, height: 24 }} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            width: '350px',
            maxWidth: 'calc(100vw - 48px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            background: 'var(--bg-elev-1)',
            borderRadius: 'var(--r-lg)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9998,
            border: '1px solid var(--border-soft)'
          }}
          className="fade-up"
        >
          {/* Header */}
          <div style={{ background: 'var(--primary)', padding: '16px', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon.Bug style={{ width: 18, height: 18 }} /> AI Tech Support
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Powered by Gemini Flash</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                <div
                  style={{
                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-elev-2)',
                    color: msg.role === 'user' ? 'white' : 'var(--text)',
                    padding: '10px 14px',
                    borderRadius: 'var(--r-md)',
                    borderBottomRightRadius: msg.role === 'user' ? 4 : undefined,
                    borderBottomLeftRadius: msg.role === 'model' ? 4 : undefined,
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.role === 'model' ? (
                    <div className="markdown-body" style={{ color: 'inherit' }}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                
                {/* Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Sources:</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {msg.citations.map((cite, i) => (
                        <li key={i}>
                          <a href={cite.uri} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                            {cite.title || new URL(cite.uri).hostname}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--bg-elev-2)', padding: '10px 14px', borderRadius: 'var(--r-md)', borderBottomLeftRadius: 4, display: 'flex', gap: '6px' }}>
                <div className="dot-typing"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px', borderTop: '1px solid var(--border-soft)', background: 'var(--bg-elev-1)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about a PC issue..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-soft)',
                  padding: '10px 14px',
                  borderRadius: 'var(--r-md)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                style={{ padding: '10px 14px' }}
              >
                <Icon.Arrow style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dot-typing {
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: var(--text-muted);
          color: var(--text-muted);
          animation: dot-typing 1.5s infinite linear;
          position: relative;
          left: -12px;
          margin-left: 12px;
          margin-right: 12px;
        }
        @keyframes dot-typing {
          0% { box-shadow: 12px 0 0 0 var(--text-muted), 24px 0 0 0 rgba(255,255,255,0.2), 36px 0 0 0 rgba(255,255,255,0.2); }
          25% { box-shadow: 12px 0 0 0 rgba(255,255,255,0.2), 24px 0 0 0 var(--text-muted), 36px 0 0 0 rgba(255,255,255,0.2); }
          50% { box-shadow: 12px 0 0 0 rgba(255,255,255,0.2), 24px 0 0 0 rgba(255,255,255,0.2), 36px 0 0 0 var(--text-muted); }
          75% { box-shadow: 12px 0 0 0 rgba(255,255,255,0.2), 24px 0 0 0 rgba(255,255,255,0.2), 36px 0 0 0 rgba(255,255,255,0.2); }
          100% { box-shadow: 12px 0 0 0 var(--text-muted), 24px 0 0 0 rgba(255,255,255,0.2), 36px 0 0 0 rgba(255,255,255,0.2); }
        }
        .markdown-body p { margin: 0 0 8px 0; }
        .markdown-body p:last-child { margin: 0; }
        .markdown-body a { color: inherit; text-decoration: underline; }
        .markdown-body code { background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
        .markdown-body pre { background: rgba(0,0,0,0.1); padding: 8px; border-radius: 4px; overflow-x: auto; font-family: monospace; font-size: 0.9em; margin: 8px 0; }
        .markdown-body ul, .markdown-body ol { margin: 0 0 8px 0; padding-left: 20px; }
      `}</style>
    </>
  );
}
