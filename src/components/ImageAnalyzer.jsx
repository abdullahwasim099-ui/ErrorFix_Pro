import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons.jsx';

export default function ImageAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setIsAnalyzing(true);
    setError(null);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result.split(',')[1];
        
        const response = await fetch('/api/gemini/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64String,
            mimeType: file.type
          })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.errorCode && data.errorCode !== 'UNKNOWN') {
          // Navigate to error detail page
          navigate(`/error/${data.errorCode.toLowerCase()}`);
        } else {
          setError("No error code detected in the image.");
        }
        setIsAnalyzing(false);
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
        setIsAnalyzing(false);
      };
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <input 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button 
          className="btn" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          style={{ background: 'var(--bg-elev-2)', color: 'var(--text)', border: '1px solid var(--border-soft)' }}
        >
          {isAnalyzing ? (
            <><div className="spinner" style={{ width: 14, height: 14, border: '2px solid var(--text-muted)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Analyzing...</>
          ) : (
            <><Icon.Search style={{ width: 16, height: 16 }} /> Analyze Screenshot</>
          )}
        </button>
        {error && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{error}</span>}
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
