import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Loader2, AlertCircle, } from 'lucide-react';
import { errorDatabase, getErrorByCode, searchErrors, getErrorsByCategory } from '../data/errorDatabase.js';
import { detectSystemInfo } from '../utils/systemDetector.js';
import DetectionBadge from '../components/DetectionBadge.jsx';
import PageHeader from '../components/PageHeader.jsx';

const POPULAR_CODES = [
  '0x0000007B', '0x00000050', '0x000000EF', '0x000000D1',
  '0x80070005', '0x8007000E', 'ERR_MODULE_NOT_FOUND', 'EADDRINUSE',
];

export default function Home() {
  const [rawInput, setRawInput] = useState('');
  const [detection, setDetection] = useState(() => ({
    os: null,
    arch: null,
    runtimes: { node: null, python: null },
    toolchains: [],
    errorCodes: { codes: [], confidences: {} },
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetection, setShowDetection] = useState(false);

  const handlePaste = (event) => {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!pasted) return;
    event.preventDefault();
    const next = rawInput ? `${rawInput}\n${pasted}` : pasted;
    setRawInput(next);
    setDetection(detectSystemInfo(next));
    setShowDetection(true);
  };

  const filteredErrors = useMemo(() => searchErrors(searchQuery), [searchQuery]);

  // Top popular codes from the database
  const popular = useMemo(() => {
    const entries = errorDatabase.slice();
    // Sort by a simple heuristic: prioritize BSOD codes and HRESULT codes
    const priority = ['bsod', 'hresult', 'node', 'python', 'generic'];
    entries.sort((a, b) => {
      const pa = priority.indexOf(a.category ?? 'generic');
      const pb = priority.indexOf(b.category ?? 'generic');
      if (pa !== pb) return pa - pb;
      return (b.summary?.length || 0) - (a.summary?.length || 0);
    });
    return entries.slice(0, 6);
  }, [errorDatabase]);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setDetection(detectSystemInfo(navigator.userAgent));
    }
  }, []);

  return (
    <section className="page">
      <Helmet>
        <title>Home | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="ErrorLookup"
        title="ErrorFix Pro"
        description="Diagnose system errors, look up codes, and contribute fixes."
      >
        <div className="grid gap-4 mb-6">
          {/* Search section */}
          <div className="col-span-1 col-span-2@md">
            <div className="form-field">
              <label htmlFor="home-search-input">Search codes, titles, or descriptions</label>
              <input
                id="home-search-input"
                type="search"
                placeholder="e.g. 0x80070005, CRITICAL_PROCESS_DIED, ERR_MODULE_NOT_FOUND"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="button button--primary w-full mt-2">Search</button>
          </div>

          {/* Diagnostic input */}
          <div className="col-span-2 col-span-1@md">
            <div className="form-field">
              <label>Paste terminal output for rapid diagnosis</label>
              <textarea
                className="w-full rounded border p-2 mb-2"
                placeholder="Paste terminal output here..."
                onPaste={handlePaste}
                value={rawInput}
                onInput={(e) => setRawInput(e.target.value)}
              ></textarea>
            </div>
            {showDetection && (
              <DetectionBadge detection={detection} onDismiss={() => setShowDetection(false)} showEmpty={!rawInput} />
            )}
          </div>
        </div>

        {/* Popular error codes */}
        <div className="mt-6 grid gap-4">
          <h4 className="text-sm font-medium mb-3">Popular Error Codes</h4>
          {popular.map((entry) => {
            const code = entry.code;
            return (
              <a
                key={code}
                href={`/errors?code=${code}`}
                className="button button--small text-left p-3 hover:bg-panel transition-colors"
                target="_blank"
                rel="noopener"
              >
                <span className="font-medium">{code}</span>
                <span className="text-xs text-muted ml-auto">{entry.title}</span>
              </a>
            );
          })}
          {filteredErrors.length > 0 && (
            <a
              href="/errors"
              className="button button--small text-left p-3 hover:bg-panel mt-2"
              target="_blank"
              rel="noopener"
            >
              View all search results ({filteredErrors.length})
            </a>
          )}
        </div>
      </PageHeader>
    </section>
  );
}