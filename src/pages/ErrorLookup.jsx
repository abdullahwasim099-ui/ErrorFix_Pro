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

  useEffect(() => {
    const shared = searchParams.get('q')
    if (shared) setQuery(shared)
    setFavorites(getFavorites())
  }, [searchParams])

  const handleToggleFavorite = (code) => {
    const newFavs = toggleFavorite(code)
    setFavorites(newFavs)
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
    </div>
  )
}
