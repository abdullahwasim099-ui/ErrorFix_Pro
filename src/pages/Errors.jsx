import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Loader2, CheckCircle, XCircle, Trash, FileText, } from 'lucide-react';
import { errorDatabase, getErrorByCode, searchErrors, getErrorsByCategory } from '../data/errorDatabase.js';
import PageHeader from '../components/PageHeader.jsx';

export default function Errors() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedCode, setSelectedCode] = useState('');

  // initial code from URL query param
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initial = urlParams.get('code') || '';
    if (initial) {
      setQuery(initial);
      setSelectedCode(initial);
    }
  }, []);

  const filtered = useMemo(() => {
    if (!query) return [];
    return searchErrors(query).filter(e => category === 'All' || e.category.toLowerCase() === category.toLowerCase());
  }, [query, category]);

  const selected = useMemo(() => {
    if (selectedCode) return getErrorByCode(selectedCode) || filtered[0];
    return filtered[0] ?? null;
  }, [selectedCode, filtered]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(errorDatabase.map(e => e.category)))], []);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.querySelector('input').value);
  };

  const toggleCategory = (cat) => setCategory(cat);

  const handleSelect = (error) => {
    setSelectedCode(error.code);
    // update URL without re-triggering the useEffect too aggressively
    const url = new URL(window.location.href);
    url.searchParams.set('code', error.code);
    history.replaceState(null, '', url);
  };

  if (!query && !selected) {
    return (
      <section className="page">
        <Helmet>
          <title>Errors | ErrorFix Pro</title>
        </Helmet>
        <PageHeader
          eyebrow="Error Lookup"
          title="Error Database"
          description="Search or browse the catalog of known errors, stop codes, and bloatware."
        >
          <p className="text-muted">Enter an error code, stop code, or keyword above to find details, diagnostic steps, and fixes.</p>
        </PageHeader>
        <p className="mt-8 text-center text-muted">No errors selected. Use the search box to get started.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <Helmet>
        <title>Errors | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="Error Lookup"
        title="Error Database"
        description="Search or browse the catalog of known errors, stop codes, and bloatware."
      >
        <form className="form-grid" onSubmit={handleSearch}>
          <div className="form-field">
            <label htmlFor="search-input">Search codes, titles, or descriptions</label>
            <input
              id="search-input"
              type="search"
              placeholder="e.g. 0x80070005, ERR_MODULE_NOT_FOUND, CRITICAL_PROCESS_DIED"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Category</label>
            <div className="form-field">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`button button--small${cat === category ? ' button--primary' : ''}`}
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="button button--primary w-full mb-2">Search</button>
        </form>
      </PageHeader>

      {filtered.length > 0 || selected ? (
        <div className="mt-6 grid gap-4">
          {/* List side */}
          <div className="col-span-1 col-span-2@md">
            <h4 className="text-sm font-semibold mb-3">Matching Errors</h4>
            <ul className="list-steps">
              {filtered.map((err) => {
                const isSelected = err.code === selectedCode;
                return (
                  <li
                    key={err.code}
                    className={`flex items-center gap-2 px-2 py-1 rounded${isSelected ? ' bg-panel' : ''} ${isSelected ? 'font-medium' : ''}`}
                    onClick={() => handleSelect(err)}
                  >
                    <span className="code">{err.code}</span>
                    <span>{err.title}</span>
                  </li>
                );
              })}
            </ul>
            {filtered.length === 0 && <li className="text-muted">No matches found.</li>}
          </div>

          {/* Detail panel */}
          <div className="col-span-2 col-span-1@md">
            {selected ? (
              <div className="prose max-w-none" style={{ color: 'var(--text)' }}>
                <h3 className="text-lg font-medium mb-3">{selected.title}</h3>
                <p className="text-muted mb-4">{selected.summary}</p>
                <details className="mt-4">
                  <summary><strong>Technical Cause</strong></summary>
                  <p>{selected.technicalCause}</p>
                </details>
                <details className="mt-4">
                  <summary><strong>Diagnostic Steps</strong></summary>
                  <ol className="list-decimal list-inside">
                    {selected.diagnosticSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </details>
                <details className="mt-4">
                  <summary><strong>Detailed Fixes</strong></summary>
                  {selected.detailedFixes.map((fix, i) => (
                    <div key={i} className="mt-3">
                      <h4>{fix.title}</h4>
                      <p>{fix.description}</p>
                      <ol className="list-decimal list-inside">
                        {fix.steps.map((s, j) => (
                          <li key={j}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </details>
              </div>
            ) : (
              <p className="text-muted">Select an error from the list to see details.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-muted text-center py-12">Enter a search term above to find errors.</p>
      )}
    </section>
  );
}