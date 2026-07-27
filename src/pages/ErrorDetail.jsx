import React from 'react';
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

  const schemaData = [];
  if (errorData) {
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Fix ${errorData.code}: ${errorData.title}`,
      "description": errorData.summary || (errorData.overview.substring(0, 150) + "..."),
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
    schemaData.push(howToSchema, faqSchema);
  }

  return (
    <div className="fade-up error-detail-page">
      <SEO 
        title={`${errorData.title} | ErrorFix Pro`} 
        description={errorData.summary || `Comprehensive guide to fix ${errorData.code} - ${errorData.title}. Learn root causes and step-by-step solutions.`}
        canonical={`https://errorfixerpro.co.uk/error/${errorData.code.toLowerCase()}`}
        schemaData={schemaData}
      />
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <Link to="/errors" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary)', marginBottom: 16, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
          <Icon.Arrow style={{ width: 16, height: 16, transform: 'rotate(180deg)' }} />
          Back to Error Lookup
        </Link>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 8, color: 'var(--text)' }}>How to Fix {errorData.code}</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{errorData.title}</p>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          Overview: What Causes {errorData.code}?
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', margin: 0 }}>
          {errorData.overview}
        </p>
      </div>

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

      <div className="card fade-up fade-up-3">
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

    </div>
  );
}
