import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { stats, errorCodes, bloatware, compatibility } from '../data/loader.js'
import { SEO } from '../components/SEO.jsx'
import { AdSlot } from '../components/AdSlot.jsx'

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
      <SEO title="ErrorFix Pro | Windows Error Diagnostics & System Cleanup" canonical="https://errorfixerpro.co.uk" />
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

      <div className="fade-up" style={{ maxWidth: 728, margin: '0 auto' }}>
        <AdSlot format="leaderboard" />
      </div>

      <div className="card fade-up" style={{ marginTop: 32, lineHeight: 1.8 }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>How to Use ErrorFix Pro's Diagnostic Utility</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-muted)' }}>
          Welcome to ErrorFix Pro, the ultimate PC diagnostic companion designed to help you resolve stubborn Windows error codes, clean up system-slowing bloatware, and ensure optimal hardware compatibility. If you are experiencing unexpected Blue Screens of Death (BSOD), application crashes, or sluggish performance, our built-in tools provide a structured approach to identifying and resolving the root causes without requiring expensive professional repairs.
        </p>
        <p style={{ marginBottom: 16, color: 'var(--text-muted)' }}>
          To begin troubleshooting, start with the <strong>Error Lookup</strong> tool. Windows error codes (like 0x80070005 or DRIVER_IRQL_NOT_LESS_OR_EQUAL) can be incredibly cryptic. Simply navigate to the Error Lookup section and enter your specific stop code into the search bar. Our programmatic database will instantly pull up a comprehensive, step-by-step guide explaining exactly what caused the crash and how to fix it using built-in Windows utilities like Command Prompt, PowerShell, the System File Checker (SFC), and Deployment Image Servicing and Management (DISM).
        </p>
        <p style={{ marginBottom: 16, color: 'var(--text-muted)' }}>
          If your system is running slowly despite having no explicit errors, the issue may be related to pre-installed software consuming valuable memory and CPU cycles. Head over to our <strong>Bloatware Cleanup</strong> module. Here, you can search for common applications that come pre-installed on modern laptops and desktops. We categorize these programs by severity—ranging from safe-to-remove adware to critical system processes that must be left alone. Removing unnecessary bloatware is one of the fastest ways to reclaim storage space and improve your system's boot times.
        </p>
        <p style={{ color: 'var(--text-muted)' }}>
          Finally, for users planning to upgrade their PC, our <strong>Hardware Guides</strong> and <strong>Compatibility Checker</strong> ensure you don't waste money on parts that won't work together. Whether you are adding more RAM, swapping out a failing hard drive for a lightning-fast NVMe SSD, or upgrading your graphics card, our guides walk you through the physical installation process while our compatibility tool highlights potential bottlenecks. Always remember to ground yourself and unplug your power supply before working inside your computer chassis.
        </p>
      </div>

      <div className="stat-grid" style={{ marginTop: 32 }}>
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

      <div className="fade-up" style={{ maxWidth: 300, margin: '0 auto' }}>
        <AdSlot format="rectangle" />
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

