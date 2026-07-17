import { useMemo, useState } from 'react'
import { Icon } from '../components/Icons.jsx'
import { searchCompatibility, compatComponents } from '../data/loader.js'

export default function Compatibility() {
  const [query, setQuery] = useState('')
  const [component, setComponent] = useState('all')

  const results = useMemo(() => searchCompatibility(query, component), [query, component])

  return (
    <div>
      <div className="page-header fade-up">
        <h1 className="page-title">Compatibility Checker</h1>
        <p className="page-subtitle">
          Find answers to common PC build and upgrade compatibility questions before you buy.
        </p>
      </div>

      <div className="search-wrap fade-up">
        <Icon.Search className="search-icon" />
        <input
          className="search-input"
          placeholder="Search compatibility questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-row fade-up">
        <button
          className={`filter-chip ${component === 'all' ? 'active' : ''}`}
          onClick={() => setComponent('all')}
        >
          All Components
        </button>
        {compatComponents.map((c) => (
          <button
            key={c}
            className={`filter-chip ${component === c ? 'active' : ''}`}
            onClick={() => setComponent(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="compat-grid">
        {results.length === 0 ? (
          <div className="empty-state">
            <Icon.Empty />
            <p>No compatibility Q&A matches your search.</p>
          </div>
        ) : (
          results.map((g, i) => (
            <div key={i} className={`compat-item fade-up fade-up-${Math.min(i + 1, 4)}`}>
              <div className="compat-head">
                <span className="compat-comp-badge">{g.component}</span>
                <span className="compat-q">{g.question}</span>
              </div>
              <div className="compat-a">{g.answer}</div>
              <div className="compat-steps">
                {g.steps.map((s, idx) => (
                  <div key={idx} className="compat-step">
                    <span className="compat-step-num">{idx + 1}</span>
                    <span>{s}</span>
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
