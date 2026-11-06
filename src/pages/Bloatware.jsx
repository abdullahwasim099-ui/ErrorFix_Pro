import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Broom, CheckCircle, AlertCircle, FileText, } from 'lucide-react';
import { getErrorsByCategory } from '../data/errorDatabase.js';
import PageHeader from '../components/PageHeader.jsx';

const BLOAT_ENTRIES = getErrorsByCategory('Bloatware');

export default function Bloatware() {
  const [reviewed, setReviewed] = useState({});
  const total = BLOAT_ENTRIES.length;
  const reviewedCount = Object.keys(reviewed).length;

  const toggleReviewed = (code) => {
    setReviewed((prev) => {
      const next = { ...prev };
      next[code] = !prev[code];
      return next;
    });
  };

  return (
    <section className="page">
      <Helmet>
        <title>Bloatware | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="Software Cleanup"
        title="Bloatware Removal Guide"
        description="Identify and safely remove pre‑installed utilities that may consume resources or duplicate Windows features."
      >
        <div className="grid grid--2" style={{ gap: '1rem', marginTop: '1rem' }}>
          <div>
            <h4 className="text-sm font-medium mb-3">Entries ({total})</h4>
            <p className="text-muted">The following utilities are commonly flagged as bloatware on OEM laptops.</p>
            <ul className="list-steps">
              {BLOAT_ENTRIES.map((entry) => {
                const alreadyReviewed = reviewed[entry.code];
                return (
                  <li key={entry.code} style={{ marginBottom: '.8rem' }}>
                    <div className="flex items-center gap-2">
                      <Broom
                        className="w-4 h-4"
                        style={{ color: alreadyReviewed ? var(--success) : var(--muted) }}
                      />
                      <span className="font-medium">{entry.title}</span>
                      <span className="ml-auto text-xs text-muted">{entry.code}</span>
                    </div>
                    <p className="text-xs mt-1">{entry.summary}</p>
                    {/* Simple review toggle */}
                    <label
                      className="checkbox checkbox--small"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                      onClick={() => toggleReviewed(entry.code)}
                    >
                      <span
        style={{
          width: 16,
          height: 16,
          border: '1px solid var(--border)',
          borderRadius: 4,
          flexShrink: 0,
          background: alreadyReviewed ? var(--success) : 'transparent',
          transition: 'background .2s',
        }}
        />
        <span className="text-xs text-muted">Reviewed</span>
      </label>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
            <p className="text-muted mb-3">Use the toggles above to mark entries you’ve reviewed. If you’ve uninstalled an application, confirm that core hardware (touchpad, keyboard, sound) still functions.</p>
            <div className="progress">
              <div
                className="progress__fill"
                style={{ width: reviewedCount === 0 ? 0 : `${(reviewedCount / total) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-center mt-2">
              {`${reviewedCount} of ${total} reviewed`}
            </div>
          </div>
        </div>
      </PageHeader>
    </section>
  );
}