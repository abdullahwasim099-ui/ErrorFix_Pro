import React, { useState } from 'react';
import { SEO } from '../components/SEO.jsx';
import { Icon } from '../components/Icons.jsx';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  return (
    <div className="fade-up">
      <SEO title="Contact Us | ErrorFix Pro" description="Get in touch with the ErrorFix Pro team for support, business inquiries, or feedback." canonical="https://errorfixerpro.co.uk/contact" />
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 8, color: 'var(--text)' }}>Contact Us</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>We'd love to hear from you.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        
        <div className="card fade-up fade-up-1">
          <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--text)' }}>Get in Touch</h2>
          <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Have a question about a specific Windows error? Want to report a bug on our site? Or perhaps you are interested in advertising opportunities? Fill out the form or reach out directly to our support team.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 10, background: 'var(--primary-soft)', borderRadius: 'var(--r-full)', color: 'var(--primary)' }}>
                <Icon.Search style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email Support</div>
                <a href="mailto:support@errorfixerpro.co.uk" style={{ fontSize: '1.05rem', color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}>support@errorfixerpro.co.uk</a>
              </div>
            </div>
          </div>
        </div>

        <div className="card fade-up fade-up-2">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ display: 'inline-flex', padding: 20, background: 'var(--success-soft)', color: 'var(--success)', borderRadius: 'var(--r-full)', marginBottom: 16 }}>
                <Icon.Check style={{ width: 32, height: 32 }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text)', marginBottom: 8 }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Thank you for reaching out. Our team will get back to you within 24-48 hours.</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required 
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  required 
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
