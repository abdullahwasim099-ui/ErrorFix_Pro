import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { stats, errorCodes, bloatware, compatibility } from '../data/loader.js'

const features = [
  {
    to: '/errors',
    icon: Icon.Bug,
    title: 'Error Lookup',
    desc: 'Search Windows stop codes and system errors with detailed fixes.',
    color: 'var(--error)',
  },
  {
    to: '/bloatware',
    icon: Icon.Trash,
    title: 'Bloatware Cleanup',
    desc: 'Identify and remove unwanted preinstalled software slowing your PC.',
    color: 'var(--warning)',
  },
  {
    to: '/hardware',
    icon: Icon.Cpu,
    title: 'Hardware Guides',
    desc: 'Step-by-step guides for installing and upgrading PC components.',
    color: 'var(--primary)',
  },
  {
    to: '/compatibility',
    icon: Icon.Check,
    title: 'Compatibility Checker',
    desc: 'Verify component compatibility before you buy or build.',
    color: 'var(--success)',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const criticalCount = errorCodes.filter((e) => e.severity === 'critical').length
  const bloatCount = bloatware.filter((b) => b.category !== 'Safe SystemProcess').length

  return (
    <div>
      <div className="hero fade-up">
        <div className="hero-content">
          <h1>Your ultimate PC diagnostic companion</h1>
          <p>
            Look up Windows error codes, identify bloatware slowing down your system, and get
            hardware upgrade guidance — all in one place.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/errors')} aria-label="Search Error Codes">
              <Icon.Search aria-hidden="true" /> Search Error Codes
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/compatibility')} aria-label="Check Compatibility">
              <Icon.Check aria-hidden="true" /> Check Compatibility
            </button>
          </div>
        </div>
      </div>

      <div className="premium-banner fade-up" style={{
        marginTop: 32,
        padding: 32,
        borderRadius: 'var(--r-lg)',
        background: 'linear-gradient(145deg, var(--bg-elev-2) 0%, var(--bg-elev) 100%)',
        border: '1px solid var(--border-soft)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--primary)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 13 }}>
          <Icon.Alert style={{ width: 18, height: 18 }} />
          Premium Feature
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
          Unlock Advanced Diagnostics
        </h2>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 15, maxWidth: 600, lineHeight: 1.6 }}>
          Scan deep Windows error databases, check comprehensive hardware upgrade paths, and download optimization scripts.
        </p>
        <a 
          href="https://www.effectivecpmnetwork.com/upt6t4u3yy?key=3ee259b98907083d2d155b0c9af3572c"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: 8, padding: '12px 24px', fontSize: 15 }}
        >
          Access Premium Companion Tools
        </a>
      </div>

      <div className="stat-grid">
        <div className="stat-card fade-up fade-up-1">
          <div className="stat-icon" style={{ background: 'var(--error-soft)', color: 'var(--error)' }}>
            <Icon.Bug />
          </div>
          <div className="stat-value">{stats.errorCodes}</div>
          <div className="stat-label">Error Codes Documented</div>
        </div>
        <div className="stat-card fade-up fade-up-2">
          <div className="stat-icon" style={{ background: 'var(--warning-soft)', color: 'var(--warning)' }}>
            <Icon.Trash />
          </div>
          <div className="stat-value">{stats.bloatware}</div>
          <div className="stat-label">Bloatware Entries</div>
        </div>
        <div className="stat-card fade-up fade-up-3">
          <div className="stat-icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
            <Icon.Cpu />
          </div>
          <div className="stat-value">{stats.guides}</div>
          <div className="stat-label">Hardware Guides</div>
        </div>
        <div className="stat-card fade-up fade-up-4">
          <div className="stat-icon" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>
            <Icon.Check />
          </div>
          <div className="stat-value">{stats.components}</div>
          <div className="stat-label">Component Categories</div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="page-header">
          <h2 className="page-title">Explore Tools</h2>
          <p className="page-subtitle">Jump straight into any diagnostic module.</p>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <button
              key={f.to}
              className={`feature-card fade-up fade-up-${i + 1}`}
              onClick={() => navigate(f.to)}
            >
              <div className="feature-icon" style={{ background: `${f.color}1f`, color: f.color }}>
                <f.icon />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-arrow">
                Open <Icon.Arrow />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }} className="card fade-up">
        <div className="card-title">Quick Stats</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--error)' }}>{criticalCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Critical error codes</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--warning)' }}>{bloatCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Removable bloatware items</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>{compatibility.length}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Compatibility Q&A entries</div>
          </div>
        </div>
      </div>
    </div>
  )
}
