import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bug, ShieldCheck, Palette, Layout, Gift, Search, Settings, Loader2, Network, TrendingUp, Folder, Box, Monitor, Cpu } from 'lucide-react';
import { errorDatabase } from '../data/errorDatabase.js';
import { detectSystemInfo } from '../utils/systemDetector.js';
import DetectionBadge from '../components/DetectionBadge.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function Dashboard() {
  const [showDetect, setShowDetect] = useState(false);
  const [detection, setDetection] = useState(() => ({ os: null, arch: null, runtimes: { node: null, python: null }, toolchains: [], errorCodes: { codes: [], confidences: {} } }));
  const [rawInput, setRawInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const handlePaste = (text) => {
    setDetection(detectSystemInfo(text));
    setShowDetect(true);
  };
  // simple debounce for live paste
  useEffect(() => {
    const t = setTimeout(() => setDetection(detectSystemInfo(rawInput)), 500);
    return () => clearTimeout(t);
  }, [rawInput]);
  // search in error database
  const filteredErrors = useMemo(() => searchErrors(searchQuery), [searchQuery]);
  return (
    <Helmet>
      <title>Dashboard | ErrorFix Pro</title>
    </Helmet>
    <section className="page">
      <PageHeader
        eyebrow="Welcome to ErrorFix Pro"
        title="Dashboard"
        description="Your central hub for error codes, system diagnostics, and contribution guides."
      >
        <div className="search-box">
          <input
            type="search"
            placeholder="Search errors or codes..."
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>
      <div className="grid grid--3" style={{ gap: '1rem' }}>
        <div className="stat">
          <div className="value">{errorDatabase.length}</div>
          <div className="label">Known Errors</div>
        </div>
        <div className="stat">
          <div className="value">{4}</div>
          <div className="label">Categories</div>
        </div>
        <div className="stat">
          <div className="value">{6}</div>
          <div className="label">Node Codes</div>
        </div>
        <div className="stat">
          <div className="value">{4}</div>
          <div className="label">Bloatware Entries</div>
        </div>
      </div>
      {showDetect && (
        <div className="mt-6 p-4 bg-panel rounded" style={{ marginTop: '2rem' }}>
          <h4 className="mb-3">System Detection</h4>
          <p className="text-sm text-muted mb-2">Pasted output:</p>
          <code className="code">{rawInput || '(no input)'}</code>
          <DetectionBadge detection={detection} onDismiss={() => setShowDetect(false)} showEmpty={!rawInput} />
        </div>
      )}
    </section>
  );
}