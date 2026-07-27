import React from 'react';
import { SEO } from '../components/SEO.jsx';

export default function AboutUs() {
  return (
    <div className="fade-up">
      <SEO title="About Us | ErrorFix Pro" description="Learn more about ErrorFix Pro, our methodology, and the team behind the ultimate Windows diagnostic companion." />
      <div className="page-header" style={{ marginBottom: 32 }}>
        <h1 className="page-title" style={{ fontSize: '2.5rem', marginBottom: 8, color: 'var(--text)' }}>About Us</h1>
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>The story behind ErrorFix Pro.</p>
      </div>

      <div className="card fade-up fade-up-1" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Who We Are</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Welcome to ErrorFix Pro. We are a dedicated team of systems administrators, PC enthusiasts, and software engineers who are passionate about demystifying the complexities of the Windows operating system. Founded in 2023, our mission is to empower everyday users and IT professionals alike by providing clear, actionable, and accurate solutions to the most common (and uncommon) PC issues.
        </p>
      </div>

      <div className="card fade-up fade-up-2" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Why We Created ErrorFix Pro</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Dealing with Windows errors, Blue Screens of Death (BSOD), bloatware, and hardware compatibility issues can be an incredibly frustrating experience. Too often, search results lead to unhelpful forum threads, automated generic answers, or worse—websites pushing questionable "driver updater" software.
        </p>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          We built ErrorFix Pro to serve as a reliable, ad-supported, and entirely free diagnostic companion. Our goal is to consolidate highly technical fixes into accessible, step-by-step guides that respect the user's time and system safety.
        </p>
      </div>

      <div className="card fade-up fade-up-3" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: 16, borderBottom: '1px solid var(--border-soft)', paddingBottom: 12, color: 'var(--text)' }}>Our Methodology</h2>
        <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Trust and accuracy are at the core of everything we publish. We do not aggregate content automatically. Every error guide, hardware compatibility check, and bloatware removal step is carefully researched and verified.
        </p>
        <ul style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Verification:</strong> Solutions are tested on virtual machines and physical hardware running modern Windows 10 and Windows 11 builds.</li>
          <li style={{ marginBottom: '8px' }}><strong>Safety First:</strong> We prioritize non-destructive fixes. When registry edits or command-line tools are required, we clearly explain the risks and recommend system restore points.</li>
          <li style={{ marginBottom: '8px' }}><strong>Transparency:</strong> We tell you exactly what each command does. You won't find blind "copy-paste this script" advice without a thorough explanation of its purpose.</li>
        </ul>
      </div>

    </div>
  );
}
