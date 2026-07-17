import { Icon } from '../components/Icons.jsx'
import { compatibility, compatComponents } from '../data/loader.js'

const componentIcons = {
  RAM: Icon.Cpu,
  Storage: Icon.Hard,
  GPU: Icon.Cpu,
  CPU: Icon.Cpu,
  PSU: Icon.Shield,
  Motherboard: Icon.Cpu,
  Cooling: Icon.Wrench,
  Networking: Icon.Wrench,
}

export default function Hardware() {
  return (
    <div>
      <div className="page-header fade-up">
        <h1 className="page-title">Hardware Guides</h1>
        <p className="page-subtitle">
          Step-by-step compatibility and installation guidance for every major PC component.
        </p>
      </div>

      <div className="feature-grid" style={{ marginBottom: 24 }}>
        {compatComponents.map((c, i) => {
          const I = componentIcons[c] || Icon.Cpu
          return (
            <div key={c} className={`card fade-up fade-up-${Math.min(i + 1, 4)}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="feature-icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                <I />
              </div>
              <div>
                <div className="card-title" style={{ marginBottom: 0 }}>{c}</div>
                <div className="card-desc">{compatibility.filter((g) => g.component === c).length} guides</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="compat-grid">
        {compatibility.map((g, i) => (
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
        ))}
      </div>
    </div>
  )
}
