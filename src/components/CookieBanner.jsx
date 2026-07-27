import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('errorfixpro_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('errorfixpro_cookie_consent', 'accepted');
    // Here you would typically trigger your analytics/ads scripts to load
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('errorfixpro_cookie_consent', 'declined');
    // Ensure no non-essential cookies are set
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-elev-2)',
      borderTop: '1px solid var(--border-soft)',
      padding: '20px 24px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 10000,
      boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
    }}>
      <div style={{ flex: '1 1 400px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text)' }}>We Value Your Privacy</h4>
        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies for these purposes, in compliance with GDPR regulations.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/privacy" className="btn" style={{ background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text)' }} onClick={() => setIsVisible(false)}>
          Privacy Policy
        </Link>
        <button className="btn" onClick={handleDecline} style={{ background: 'var(--bg-elev-1)', border: '1px solid var(--border-soft)', color: 'var(--text)' }}>
          Decline Non-Essential
        </button>
        <button className="btn btn-primary" onClick={handleAccept}>
          Accept All
        </button>
      </div>
    </div>
  );
}
