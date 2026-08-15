import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '48px',
      padding: '32px 24px',
      borderTop: '1px solid var(--border-soft)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      color: 'var(--text-muted)',
      fontSize: '0.875rem',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About Us</Link>
        <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link>
        <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</Link>
        <Link to="/adsense-policies" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>AdSense Policies</Link>
      </div>
      <p style={{ margin: 0, fontSize: '0.75rem' }}>
        &copy; {new Date().getFullYear()} ErrorFix Pro. All rights reserved.
      </p>
    </footer>
  );
}
