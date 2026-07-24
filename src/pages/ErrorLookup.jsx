import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { searchErrors, severityOrder, errorCodes } from '../data/loader.js'
import { getFavorites, toggleFavorite } from '../utils/favorites.js'

const severityFilters = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
  { key: 'favorites', label: 'Favorites' }
]

export default function ErrorLookup() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [copiedCodes, setCopiedCodes] = useState({})
  
  const [reportingError, setReportingError] = useState(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  useEffect(() => {
    const shared = searchParams.get('q')
    if (shared) setQuery(shared)
    setFavorites(getFavorites())
  }, [searchParams])

  const handleToggleFavorite = (code) => {
    const newFavs = toggleFavorite(code)
    setFavorites(newFavs)
  }

  const handleCopy = (errorItem) => {
    const textToCopy = `Error: ${errorItem.code}\nIssue: ${errorItem.issue}\nDescription: ${errorItem.description}\n\nFix Steps:\n${errorItem.fix.map((step, i) => `${i + 1}. ${step}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedCodes((prev) => ({ ...prev, [errorItem.code]: true }));
      setTimeout(() => {
        setCopiedCodes((prev) => ({ ...prev, [errorItem.code]: false }));
      }, 2000);
    });
  }

  const handleExportFavorites = () => {
    if (favorites.length === 0) {
      alert("No favorites to export.");
      return;
    }
    const favoriteData = errorCodes.filter(e => favorites.includes(e.code));
    const dataStr = JSON.stringify(favoriteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'errorfix_favorites.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleReportClick = (eItem) => {
    setReportingError(eItem)
    setFeedbackText('')
    setFeedbackSubmitted(false)
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setReportingError(null)
    }, 2000)
  }

  const results = useMemo(() => {
    let r = searchErrors(query)
    if (severity === 'favorites') {
      r = r.filter((e) => favorites.includes(e.code))
    } else if (severity !== 'all') {
      r = r.filter((e) => e.severity === severity)
    }
    return [...r].sort((a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9))
  }, [query, severity, favorites])

  return (
    <div>
      <div className="page-header fade-up">
        <h1 className="page-title">Error Lookup</h1>
        <p className="page-subtitle">
          Search Windows stop codes, BSOD errors, and system error codes by code, name, or description.
        </p>
      </div>
      <div className="search-wrap fade-up">
        <Icon.Search className="search-icon" />
        <input
          className="search-input"
          placeholder="Search by error code (e.g. 0x0000000A) or name (e.g. IRQL)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="filter-row fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {severityFilters.map((f) => (
            <button
              key={f.key}
              className={`filter-chip ${severity === f.key ? 'active' : ''}`}
              onClick={() => setSeverity(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleExportFavorites} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon.Download style={{ width: 16, height: 16 }} />
          Export Favorites
        </button>
      </div>

      <div className="error-grid">
        {results.length === 0 ? (
          <div className="empty-state">
            <Icon.Empty />
            <p>No error codes match your search.</p>
          </div>
        ) : (
          results.map((e, i) => (
            <div key={e.code} className={`error-item fade-up fade-up-${Math.min(i + 1, 4)}`}>
              <div className="error-item-head" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <span className="error-code">{e.code}</span>
                  <span className={`badge badge-${e.severity}`}>{e.severity}</span>
                  <span className="error-issue">{e.issue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleCopy(e)}
                    aria-label={`Copy ${e.code} fix steps to clipboard`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedCodes[e.code] ? 'var(--success)' : 'var(--text-faint)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      transition: 'color 0.2s ease',
                      marginTop: '-2px'
                    }}
                    title="Copy to clipboard"
                  >
                    {copiedCodes[e.code] ? (
                      <>
                        <Icon.Check style={{ width: 16, height: 16 }} aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Icon.Copy style={{ width: 16, height: 16 }} aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReportClick(e)}
                    aria-label={`Report issue with ${e.code}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-faint)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      transition: 'color 0.2s ease',
                      marginTop: '-2px'
                    }}
                    title="Report Issue"
                  >
                    <Icon.Flag style={{ width: 16, height: 16 }} aria-hidden="true" />
                    Report
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(e.code)}
                    aria-label={favorites.includes(e.code) ? `Remove ${e.code} from favorites` : `Add ${e.code} to favorites`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: favorites.includes(e.code) ? 'var(--primary)' : 'var(--text-faint)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'grid',
                      placeItems: 'center',
                      transition: 'color 0.2s ease',
                      marginTop: '-2px',
                      marginRight: '-4px'
                    }}
                  >
                    {favorites.includes(e.code) ? (
                      <Icon.BookmarkSolid style={{ width: 20, height: 20 }} aria-hidden="true" />
                    ) : (
                      <Icon.Bookmark style={{ width: 20, height: 20 }} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
              <div className="error-desc">{e.description}</div>
              <div className="error-fix">
                {e.fix.map((step, idx) => (
                  <div key={idx} className="error-fix-item">
                    <span className="error-fix-num">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {reportingError && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '24px'
        }}>
          <div className="card fade-up" style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
            <button
              onClick={() => setReportingError(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-faint)',
                cursor: 'pointer'
              }}
            >
              <Icon.X style={{ width: 20, height: 20 }} />
            </button>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Report Issue</h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
              Did the fix for <strong>{reportingError.code}</strong> not work? Let us know what happened.
            </p>
            {feedbackSubmitted ? (
              <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--success)' }}>
                <Icon.Check style={{ width: 48, height: 48, margin: '0 auto 16px auto', display: 'block' }} />
                <h4 style={{ margin: 0, fontSize: '16px' }}>Thank you for your feedback!</h4>
                <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)' }}>This helps us improve our database.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '12px',
                    borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border-soft)',
                    background: 'var(--bg-elev-2)',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                    marginBottom: '16px',
                    resize: 'vertical'
                  }}
                  placeholder="What happened when you tried the fix? (Optional)"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setReportingError(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
