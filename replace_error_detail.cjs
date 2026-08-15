const fs = require('fs');
const path = require('path');

const content = `import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { errorDatabase } from '../data/errorDatabase.js';
import { SEO } from '../components/SEO.jsx';
import { Icon } from '../components/Icons.jsx';

export default function ErrorDetail() {
  const { code } = useParams();
  const errorData = errorDatabase.find(e => e.code.toLowerCase() === code.toLowerCase());

  if (!errorData) {
    return (
      <div className="fade-up" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <SEO title="Error Not Found | ErrorFix Pro" />
        <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>Error Guide Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1.1rem' }}>We couldn't find a detailed guide for the error code: {code}</p>
        <Link to="/errors" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon.Arrow style={{ width: 16, height: 16, transform: 'rotate(180deg)' }} />
          Return to Error Lookup
        </Link>
      </div>
    );
  }

  const relatedErrors = errorDatabase
    .filter(e => e.code !== errorData.code)
    .slice(0, 4);

  const schemaData = [];
  if (errorData) {
    const techArticleSchema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": \`How to Fix \${errorData.code}: \${errorData.title}\`,
      "description": errorData.summary,
      "author": {
        "@type": "Organization",
        "name": "ErrorFix Pro"
      }
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": \`How to Fix \${errorData.code}: \${errorData.title}\`,
      "description": errorData.summary,
      "step": errorData.detailedFixes.map((fix, fixIdx) => ({
        "@type": "HowToSection",
        "name": fix.title,
        "itemListElement": fix.steps.map((step, stepIdx) => ({
          "@type": "HowToStep",
          "position": stepIdx + 1,
          "text": step
        }))
      }))
    };
    
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": errorData.faq.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
    schemaData.push(techArticleSchema, howToSchema, faqSchema);
  }

  return (
    <div className="fade-up error-detail-page">
      <SEO 
        title={\`\${errorData.title} | ErrorFix Pro\`} 
        description={errorData.summary || \`Comprehensive guide to fix \${errorData.code} - \${errorData.title}. Learn root causes and step-by-step solutions.\`}
        canonical={\`https://errorfixerpro.co.uk/error/\${errorData.code.toLowerCase()}\`}
        schemaData={schemaData}
      />
      
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
        
        {/* Badges */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--bg-elev-2)', padding: '6px 12px', borderRadius: 'var(--r-md)', fontSize: '0.85rem', color: 'var(--text)', border: '1px solid var(--border-soft)' }}>
            <Icon.Check style={{ width: 14, height: 14, color: 'var(--success)' }} /> Updated for Windows 11/10
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--bg-elev-2)', padding: '6px 12px', borderRadius: 'var(--r-md)', fontSize: '0.85rem', color: 'var(--text)', border: '1px solid var(--border-soft)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 5 min read
          </span>
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
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

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
                    {step}
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

      {/* Related Errors Section */}
      <div className="card fade-up fade-up-4">
        <h2 style={{ fontSize: '1.8rem', marginBottom: 24, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Related Errors & Suggested Fixes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {relatedErrors.map((related, idx) => (
            <Link key={idx} to={\`/error/\${related.code.toLowerCase()}\`} style={{ display: 'block', textDecoration: 'none' }}>
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
`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'ErrorDetail.jsx'), content, 'utf8');
console.log('ErrorDetail.jsx replaced successfully.');
