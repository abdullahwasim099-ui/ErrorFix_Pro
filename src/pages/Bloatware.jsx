import { useMemo, useState } from 'react'
import { Icon } from '../components/Icons.jsx'
import { searchBloatware, bloatwareCategories } from '../data/loader.js'

const allFilter = 'all'
const categoryColors = {
  Bloatware: 'var(--warning)',
  'Potentially Unwanted Program (PUP)': 'var(--error)',
  'Safe System Process': 'var(--success)',
}

export default function Bloatware() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const results = useMemo(() => searchBloatware(query, category), [query, category])

  return (
    <div>
      <div className="page-header fade-up">
        <h1 className="page-title">Bloatware Cleanup</h1>
        <p className="page-subtitle">
          Identify preinstalled and background software that may be slowing down your PC, with
          safe removal recommendations for Windows 10 and 11.
        </p>
      </div>

      <div className="search-wrap fade-up">
        <Icon.Search className="search-icon" />
        <input
          className="search-input"
          placeholder="Search by process name (e.g. CortanaUI) or manufacturer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-row fade-up">
        <button
          className={`filter-chip ${category === allFilter ? 'active' : ''}`}
          onClick={() => setCategory(allFilter)}
        >
          All
        </button>
        {bloatwareCategories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="error-grid">
        {results.length === 0 ? (
          <div className="empty-state">
            <Icon.Empty />
            <p>No bloatware entries match your search.</p>
          </div>
        ) : (
          results.map((b, i) => {
            const color = categoryColors[b.category] || 'var(--text-muted)'
            return (
              <div key={b.processName} className={`bloat-item fade-up fade-up-${Math.min(i + 1, 4)}`}>
                <div className="bloat-head">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span className="bloat-proc">{b.processName}</span>
                  </div>
                  <div className="bloat-meta">
                    <span className="badge" style={{ background: `${color}1f`, color }}>{b.category}</span>
                    <span className="badge badge-neutral">{b.manufacturer}</span>
                  </div>
                </div>
                <div className="bloat-reco">
                  <div className="bloat-reco-block">
                    <div className="bloat-reco-label">Windows 10</div>
                    <div className="bloat-reco-text">{b.recommendation.win10}</div>
                  </div>
                  <div className="bloat-reco-block">
                    <div className="bloat-reco-label">Windows 11</div>
                    <div className="bloat-reco-text">{b.recommendation.win11}</div>
                  </div>
                </div>
                <div className="bloat-issues">{b.common_issues}</div>
                <div className="bloat-methods">
                  {Object.keys(b.removal_methods).map((m) => (
                    <span key={m} className="badge badge-neutral">{m.replace(/_/g, ' ')}</span>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
