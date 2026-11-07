import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Stop, Loader2, CheckCircle, AlertCircle, } from 'lucide-react';
import { detectSystemInfo } from '../utils/systemDetector.js';
import { DetectionBadge } from '../components/DetectionBadge.jsx';
import { errorDatabase } from '../data/errorDatabase.js';
import PageHeader from '../components/PageHeader.jsx';

const SCAN_STEPS = [
  { id: 'env', label: 'Environment fingerprint', threshold: 25 },
  { id: 'startup', label: 'Startup entries scan', threshold: 50 },
  { id: 'drivers', label: 'Driver inventory', threshold: 75 },
  { id: 'findings', label: 'Findings', threshold: 100 },
];

export default function Scanner() {
  const [detection, setDetection] = useState(() => {
    if (typeof navigator !== 'undefined') {
      return detectSystemInfo(navigator.userAgent);
    }
    return { os: null, arch: null, runtimes: { node: null, python: null }, toolchains: [], errorCodes: { codes: [], confidences: {} } };
  });
  const [status, setStatus] = useState('idle'); // idle | scanning | complete
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState({});
  const [findings, setFindings] = useState([]);
  const intervalRef = useRef(null);

  // initialize step progress empty
  useEffect(() => {
    SCAN_STEPS.forEach((s) => setStepProgress({ ...stepProgress, [s.id]: 0 }));
  }, []);

  // start simulation
  const start = () => {
    if (status === 'scanning') return;
    setStatus('scanning');
    setProgress(0);
    // reset step progress
    const newProgress = {};
    SCAN_STEPS.forEach((s) => (newProgress[s.id] = 0));
    setStepProgress(newProgress);

    let current = 0;
    intervalRef.current = setInterval(() => {
      current = Math.min(100, current + (3 + Math.floor(Math.random * 7)));
      setProgress(current);
      // update step thresholds
      const updated = { ...stepProgress };
      SCAN_STEPS.forEach((s) => {
        if (current >= s.threshold && updated[s.id] < 100) {
          updated[s.id] = 100;
        }
      });
      setStepProgress(updated);

      if (current >= 100) {
        clearInterval(intervalRef.current);
        setStatus('complete');
        // generate random findings from errorDatabase
        const sample = errorDatabase.sort(() => Math.random() - 0.5).slice(0, 3);
        setFindings(sample);
      }
    }, 150);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setStatus('idle');
    setProgress(0);
    setFindings([]);
  };

  // detection badge from user agent
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setDetection(detectSystemInfo(navigator.userAgent));
    }
  }, []);

  // when status completes, maybe auto-show findings after a slight delay
  useEffect(() => {
    if (status === 'complete' && findings.length === 0) {
      const sample = errorDatabase.sort(() => Math.random() - 0.5).slice(0, 3);
      setFindings(sample);
    }
  }, [status, findings.length]);

  // detection badge
  const badgeProps = {
    detection,
    onDismiss: () => {}, // not used here
    showEmpty: false,
  };

  return (
    <section className="page">
      <Helmet>
        <title>Scanner | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="System Scanner"
        title="System Scanner Simulation"
        description="A safe, simulated scanner that checks your system environment and reports potential findings."
      >
        <div className="grid gap-4" style={{ marginTop: '1rem' }}>
          <DetectionBadge detection={detection} onDismiss={() => {}} showEmpty={false} />
          <div>
            <button
              className={`button ${status === 'scanning' ? 'button--danger' : 'button--primary'}`}
              onClick={() => start()}
              disabled={status !== 'idle'}
            >
              {status === 'scanning' ? <Stop className="mr-2" /> : <Play className="mr-2" />}
              {status === 'scanning' ? 'Stop' : 'Start Simulation'}
            </button>
            <button
              className="button button--secondary ml-2"
              onClick={() => reset()}
              disabled={status !== 'scanning'}
            >
              Reset
            </button>
          </div>
        </div>

        {status === 'scanning' && (
          <div className="mt-4">
            <div className="progress">
              <div
                className="progress__fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted mt-2">Progress: {progress}%</p>
            <div className="grid grid--2" style={{ gap: '1rem', marginTop: '.5rem' }}>
              {SCAN_STEPS.map((s) => (
                <div key={s.id} className="flex items-center text-sm">
                  <span className="flex-1">{s.label}</span>
                  <span className="w-20 text-right">
                    {stepProgress[s.id] === 100 ? (
                      <CheckCircle className="text-success" />
                    ) : (
                      <span>{stepProgress[s.id]}%</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'complete' && findings.length > 0 && (
          <div className="mt-6 grid gap-4">
            <h4 className="text-font-medium mb-3">Potential Findings</h4>
            {findings.map((entry, i) => (
              <div key={i} className="p-3 bg-panel rounded">
                <h5 className="font-medium">{entry.title}</h5>
                <p className="text-muted text-sm">{entry.summary}</p>
                <a
                  href={`/errors?code=${entry.code}`}
                  className="text-primary underline hover:underline-opacity-80"
                  target="_blank"
                  rel="noopener"
                >
                  View in Error Lookup
                </a>
              </div>
            ))}
          </div>
        )}

        {status === 'complete' && (
          <p className="mt-4 text-center text-muted">
            Scan complete. No critical issues were flagged, but the findings above are sample entries from the database for demonstration.
          </p>
        )}
      </PageHeader>
    </section>
  );
}