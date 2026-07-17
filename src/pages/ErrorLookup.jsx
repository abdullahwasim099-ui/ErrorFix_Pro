import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { searchErrors, severityOrder } from '../data/loader.js'

const severityFilters = [
  { key: 'all', label: 'All' },
  { key: 'critical', label: 'Critical' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
]

export default function ErrorLookup() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('all')

  useEffect(() => {
    const shared = searchParams.get('q')
    if (shared) setQuery(shared)
  }, [searchParams])

  const results = useMemo(() => {
    let r = searchErrors(query)
    if (severity !== 'all') r = r.filter((e) => e.severity === severity)
    return [...r].sort((a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9))
  }, [query, severity])

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

      <div className="filter-row fade-up">
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

      <div className="error-grid">
        {results.length === 0 ? (
          <div className="empty-state">
            <Icon.Empty />
            <p>No error codes match your search.</p>
          </div>
        ) : (
          results.map((e, i) => (
            <div key={e.code} className={`error-item fade-up fade-up-${Math.min(i + 1, 4)}`}>
              <div className="error-item-head">
                <span className="error-code">{e.code}</span>
                <span className={`badge badge-${e.severity}`}>{e.severity}</span>
                <span className="error-issue">{e.issue}</span>
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
