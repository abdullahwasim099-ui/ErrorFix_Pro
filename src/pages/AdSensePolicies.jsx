import React from 'react';
import { SEO } from '../components/SEO.jsx';
import { AdSlot } from '../components/AdSlot.jsx';

export default function AdSensePolicies() {
  return (
    <div className="fade-up">
      <SEO 
        title="AdSense Program Policies & Compliance | ErrorFix Pro" 
        description="Learn how ErrorFix Pro adheres to Google AdSense Program Policies, ensuring a safe, transparent, and high-quality environment for advertisers and users." 
        canonical="https://errorfixerpro.co.uk/adsense-policies"
      />
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 12, color: 'var(--text)' }}>
          AdSense Program Policies & Compliance Guide
        </h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Our commitment to 100% adherence to Google's publisher guidelines and a high-quality ecosystem.
        </p>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          1. Invalid Clicks and Impressions
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
          Publishers may not click their own ads or use any means to inflate impressions and/or clicks artificially. ErrorFix Pro prohibits the use of automated clicking tools, robots, or other deceptive software. 
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text)' }}>
          <li>We do not encourage users to click on ads.</li>
          <li>We do not use misleading headings (e.g., "Support us by clicking here").</li>
          <li>Our traffic is strictly monitored for botnets and fraudulent activity.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          2. Content Guidelines
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
          AdSense requires sites to provide valuable, original content. ErrorFix Pro focuses purely on high-quality technical diagnostics and troubleshooting guides for Windows environments.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text)' }}>
          <li><strong>No Thin Content:</strong> Every error code guide spans well over 400 words, including deep technical breakdowns, step-by-step solutions, hardware considerations, and FAQs.</li>
          <li><strong>No Prohibited Content:</strong> We do not host adult content, violent content, hate speech, or software piracy instructions. All tools referenced (e.g., SFC, DISM) are standard Microsoft Windows utilities.</li>
          <li><strong>Originality:</strong> Our content is entirely authored by tech experts focusing on actual OS mechanics, preventing duplicate or scraped content penalties.</li>
        </ul>
      </div>

      {/* In-Article Ad Slot */}
      <AdSlot format="rectangle" />

      <div className="card fade-up fade-up-3" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          3. Ad Placement and Layout Requirements
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
          We design our interfaces to prevent accidental clicks and ensure a seamless, non-intrusive user experience.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text)' }}>
          <li><strong>CLS Prevention:</strong> All ad slots utilize strict minimum-height containers (e.g., 280px for rectangles) so that content never shifts downward unexpectedly when an ad loads.</li>
          <li><strong>Distance from Interactive Elements:</strong> Ads are never placed adjacent to CTAs (e.g., "Scan Now"), pagination, or navigational drop-downs.</li>
          <li><strong>Content-to-Ad Ratio:</strong> We ensure that the main screen area is dominated by actual educational content before any ad is introduced.</li>
          <li><strong>No Empty Pages:</strong> Ads are not placed on pages devoid of content or pages solely generated for the purpose of showing ads.</li>
        </ul>
      </div>

      <div className="card fade-up fade-up-4" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>
          4. Traffic Sources and Transparency
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
          Traffic to ErrorFix Pro must be organic and authentic. We rely on organic search engine ranking, social media sharing by genuine users, and direct navigation.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, listStylePosition: 'outside', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text)' }}>
          <li>We do not utilize paid-to-click (PTC), paid-to-surf, or autosurf programs.</li>
          <li>Our domain strictly utilizes HTTPS, ensuring secure traffic paths for both our users and Google's ad serving scripts.</li>
        </ul>
      </div>
      
      <div className="card fade-up fade-up-5" style={{ marginBottom: 32, borderLeft: '4px solid var(--primary)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--text)' }}>
          Reporting Policy Violations
        </h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', margin: 0 }}>
          If you believe an advertisement displayed on this network violates Google's policies or if you encounter issues regarding the content quality on our site, please report the ad via the Google "AdChoices" icon or <a href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>contact us directly</a> for swift remediation.
        </p>
      </div>

    </div>
  );
}
