import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader.jsx';

export default function Compatibility() {
  return (
    <section className="page">
      <Helmet>
        <title>Compatibility | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="System Compatibility"
        title="Compatibility Matrix"
        description="Browser, Node, and runtime compatibility reference for the ErrorFix Pro application."
      >
        <div className="grid grid--2" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div>
            <h4 className="text-sm font-medium mb-3">Browser</h4>
            <ul className="list-disc list-inside text-muted">
              <li>Chrome 105+</li>
              <li>Firefox 102+</li>
              <li>Edge 105+</li>
              <li>Safari 15+</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Node.js</h4>
            <ul className="list-disc list-inside text-muted">
              <li>Node 18 (LTS) or newer</li>
              <li>Recommended: Node 20.x</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">OS</h4>
            <ul className="list-disc list-inside text-muted">
              <li>Windows 10/11 (x64, arm64)</li>
              <li>macOS 12+ (Intel, Apple Silicon)</li>
              <li>Linux (x64, arm64) with glibc 2.31+</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-panel rounded">
          <h5 className="text-font-medium mb-3">Vite Build Requirements</h5>
          <ul className="list-disc list-inside text-muted">
            <li>Node 18+ (recommended 20+)</li>
            <li>npm 8+ or yarn 1.22+</li>
            <li>Vite 5+</li>
          </ul>
        </div>
      </PageHeader>
    </section>
  );
}