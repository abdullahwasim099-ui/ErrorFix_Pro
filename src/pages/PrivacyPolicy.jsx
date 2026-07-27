import React from 'react';
import { SEO } from '../components/SEO.jsx';

export default function PrivacyPolicy() {
  return (
    <div className="fade-up">
      <SEO title="Privacy Policy | ErrorFix Pro" description="Read the ErrorFix Pro Privacy Policy to understand how we manage cookies, ad networks, and protect your data." />
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 8, color: 'var(--text)' }}>Privacy Policy</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Last Updated: October 2023</p>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Introduction</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          At ErrorFix Pro ("we," "our," or "us"), we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information that we receive when you use our website, https://errorfixerpro.co.uk.
        </p>
      </div>

      <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Information We Collect</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          We collect minimal personal data. The information we do collect generally falls into two categories:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Information you provide voluntarily:</strong> If you contact us via our Contact Us form, we collect your name, email address, and the contents of your message. This data is used solely to respond to your inquiry.</li>
          <li style={{ marginBottom: '8px' }}><strong>Automated Information (Cookies & Analytics):</strong> When you browse our site, third-party analytics and advertising partners may automatically collect device information, IP addresses, and browsing behavior using cookies and web beacons.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-3" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Third-Party Advertising and Cookies</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          To keep ErrorFix Pro free for all users, we monetize our site using third-party advertising networks, specifically <strong>Google AdSense</strong> and <strong>Adsterra</strong>. 
        </p>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          These third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
        </p>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Users may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>www.aboutads.info</a>.
        </p>
      </div>

      <div className="card fade-up fade-up-4" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>User Data Transparency</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your data is used exclusively to improve the user experience on our site, analyze site traffic via anonymous metrics, and ensure the functionality of our ad-supported ecosystem.
        </p>
      </div>

    </div>
  );
}
