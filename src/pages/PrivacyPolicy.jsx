import React from 'react';
import { SEO } from '../components/SEO.jsx';

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="fade-up">
      <SEO 
        title="Privacy Policy | ErrorFix Pro" 
        description="ErrorFix Pro Privacy Policy: Learn how we protect your data, use cookies, and comply with Google AdSense, GDPR, and CCPA regulations." 
        canonical="https://errorfixerpro.co.uk/privacy" 
      />
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 8, color: 'var(--text)' }}>Privacy Policy</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Last Updated: {lastUpdated}</p>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>1. Introduction</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          At ErrorFix Pro ("we," "our," or "us"), accessible from https://errorfixerpro.co.uk, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ErrorFix Pro and how we use it.
        </p>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '16px' }}>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
      </div>

      <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>2. Google AdSense & Advertising Cookies</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          We use Google AdSense to serve advertisements to our users to help support and maintain our free diagnostic tools. As a third-party vendor, Google uses cookies to serve ads on our site.
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
          <li>Users may opt-out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Ads Settings</a>.</li>
          <li>Alternatively, you can opt-out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>www.aboutads.info</a>.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-3" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>3. Information We Collect</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          ErrorFix Pro collects minimal personal data. The information we do collect falls into the following categories:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Log Files:</strong> We follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
          <li><strong>Cookies and Web Beacons:</strong> Like any other website, ErrorFix Pro uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</li>
          <li><strong>Voluntary Information:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-4" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Under the CCPA, among other rights, California consumers have the right to:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '16px' }}>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
        </p>
      </div>

      <div className="card fade-up fade-up-5" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>5. GDPR Data Protection Rights</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-6">
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>6. Consent</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions. Our integrated Cookie Consent Banner allows you to manage your ongoing preferences at any time.
        </p>
      </div>

    </div>
  );
}
