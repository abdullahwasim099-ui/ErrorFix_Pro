import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { errorDatabase } from '../data/errorDatabase.js';
import { SEO } from '../components/SEO.jsx';
import { generateErrorSEO } from '../utils/seo.js';
import { Icon } from '../components/Icons.jsx';
import { AdSlot } from '../components/AdSlot.jsx';

const CodeSnippet = ({ command }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '6px', 
      background: 'var(--bg-elev)', 
      border: '1px solid var(--border-soft)', 
      padding: '2px 8px', 
      borderRadius: '4px', 
      fontFamily: 'monospace', 
      fontSize: '0.9rem', 
      color: 'var(--primary)', 
      margin: '0 4px',
      wordBreak: 'break-all'
    }}>
      {command}
      <button onClick={handleCopy} title="Copy command" style={{ 
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer', 
        padding: '2px', 
        display: 'flex', 
        alignItems: 'center', 
        color: copied ? 'var(--success)' : 'var(--text-muted)',
        transition: 'color 0.2s'
      }}>
        {copied ? <Icon.Check style={{ width: 14, height: 14 }} /> : <Icon.Copy style={{ width: 14, height: 14 }} />}
      </button>
    </span>
  );
};

const CommandText = ({ text }) => {
  if (!text.includes("'")) return <>{text}</>;
  
  const parts = text.split("'");
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // It's inside quotes
          return <CodeSnippet key={index} command={part} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

const FeedbackWidget = () => {
  const [feedback, setFeedback] = useState(null);

  if (feedback === 'yes') {
    return (
      <div style={{ padding: '24px', background: 'var(--bg-elev-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--success)', textAlign: 'center', color: 'var(--success)' }}>
        <Icon.Check style={{ width: 24, height: 24, marginBottom: 8, margin: '0 auto' }} />
        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>Thank you for your feedback!</h4>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>We're glad this guide helped you resolve the issue.</p>
      </div>
    );
  }

  if (feedback === 'no') {
    return (
      <div style={{ padding: '24px', background: 'var(--bg-elev-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text)' }}>We're sorry this didn't help.</h4>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>You might want to try our AI diagnostic tool or search for related symptoms.</p>
        <Link to="/errors" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Search Other Solutions</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: 'var(--bg-elev-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-soft)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text)' }}>Did this fix resolve your issue?</h4>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => setFeedback('yes')} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: '100px', justifyContent: 'center' }}>
          Yes
        </button>
        <button onClick={() => setFeedback('no')} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: '100px', justifyContent: 'center' }}>
          No
        </button>
      </div>
    </div>
  );
};

export default function ErrorDetail() {
  const { code } = useParams();
  const errorData = errorDatabase.find(e => e.code.toLowerCase() === code.toLowerCase());

  if (!errorData) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/errors?q=${encodeURIComponent(searchQuery)}`);
      }
    };

    return (
      <div className="fade-up" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <SEO title="Error Not Found | ErrorFix Pro" canonical="https://errorfixerpro.co.uk/errors" />
        <Icon.Search style={{ width: 48, height: 48, color: 'var(--text-muted)', margin: '0 auto 24px', opacity: 0.5 }} />
        <h2 style={{ fontSize: '2.2rem', marginBottom: 16 }}>Error Guide Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '1.1rem', lineHeight: 1.6 }}>
          We couldn't find a detailed diagnostic guide for the error code: <strong style={{ color: 'var(--text)' }}>{code}</strong>. 
          Please check for typos or search our database for related symptoms.
        </p>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by error code or symptom..."
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: 'var(--r-md)', 
              border: '1px solid var(--border-soft)',
              background: 'var(--bg-elev)',
              color: 'var(--text)',
              fontSize: '1rem'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
            Search
          </button>
        </form>

        <Link to="/errors" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon.Arrow style={{ width: 16, height: 16, transform: 'rotate(180deg)' }} />
          Browse All Errors
        </Link>
      </div>
    );
  }

  const relatedErrors = errorDatabase
    .filter(e => e.code !== errorData.code)
    .slice(0, 4);

  const seoProps = generateErrorSEO(errorData);

  return (
    <div className="fade-up error-detail-page">
      <SEO {...seoProps} />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" style={{ marginBottom: 24 }}>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, gap: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link></li>
          <li>&gt;</li>
          <li><Link to="/errors" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Error Lookup</Link></li>
          <li>&gt;</li>
          <li style={{ color: 'var(--primary)', fontWeight: 600 }}>{errorData.code}</li>
        </ul>
      </nav>

      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 12, color: 'var(--text)' }}>How to Fix {errorData.code}</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 16 }}>{errorData.title}</p>
        
        {/* Badges and Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--bg-elev-2)', padding: '6px 12px', borderRadius: 'var(--r-md)', fontSize: '0.85rem', color: 'var(--text)', border: '1px solid var(--border-soft)' }}>
              <Icon.Check style={{ width: 14, height: 14, color: 'var(--success)' }} /> Updated for Windows 11/10
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--bg-elev-2)', padding: '6px 12px', borderRadius: 'var(--r-md)', fontSize: '0.85rem', color: 'var(--text)', border: '1px solid var(--border-soft)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 5 min read
            </span>
          </div>
          <button onClick={() => window.print()} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: '0.85rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print / PDF
          </button>
        </div>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Detailed Technical Cause
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', margin: 0 }}>
          {errorData.technicalCause || errorData.overview}
        </p>
      </div>

      {errorData.diagnosticSteps && (
        <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
            Quick System Diagnostic Steps
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20, listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {errorData.diagnosticSteps.map((step, idx) => (
              <li key={idx} style={{ lineHeight: 1.6, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                <CommandText text={step} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Compliant In-Article Ad Placement (Appears after significant content) */}
      <AdSlot format="rectangle" />

      <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 24, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Step-by-Step Fixes
        </h2>
        
        {errorData.detailedFixes.map((fix, idx) => (
          <div key={idx} style={{ marginBottom: idx === errorData.detailedFixes.length - 1 ? 0 : 32 }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 16, color: 'var(--primary)' }}>
              Solution {idx + 1}: {fix.title}
            </h3>
            <div style={{ background: 'var(--bg-elev-2)', borderRadius: 'var(--r-md)', padding: '24px 32px' }}>
              <ol style={{ margin: 0, paddingLeft: 0, listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {fix.steps.map((step, stepIdx) => (
                  <li key={stepIdx} style={{ lineHeight: 1.6, color: 'var(--text)', fontSize: '1rem' }}>
                    <CommandText text={step} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      {errorData.hardwareConsiderations && (
        <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
            Hardware & Driver Considerations
          </h2>
          <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', margin: 0 }}>
            {errorData.hardwareConsiderations}
          </p>
        </div>
      )}

      <div className="card fade-up fade-up-3" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 24, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {errorData.faq.map((q, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--text)' }}>{q.question}</h3>
              <p style={{ lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{q.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <FeedbackWidget />
      </div>

      {/* Leaderboard Ad Slot Before Related Content */}
      <AdSlot format="leaderboard" />

      {/* Related Errors Section */}
      <div className="card fade-up fade-up-4">
        <h2 style={{ fontSize: '1.8rem', marginBottom: 24, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Related Errors & Suggested Fixes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {relatedErrors.map((related, idx) => (
            <Link key={idx} to={`/error/${related.code.toLowerCase()}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ background: 'var(--bg-elev-2)', padding: '16px', borderRadius: 'var(--r-md)', border: '1px solid var(--border-soft)', height: '100%', transition: 'border-color 0.2s ease' }} 
                   onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                   onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-soft)'}>
                <h4 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--primary)' }}>{related.code}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {related.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
