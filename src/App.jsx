import { useState } from 'react'
import { NavLink, Routes, Route, useNavigate, Link } from 'react-router-dom'
import { useTheme } from './theme/ThemeContext.jsx'
import { Icon } from './components/Icons.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ErrorLookup from './pages/ErrorLookup.jsx'
import Bloatware from './pages/Bloatware.jsx'
import Hardware from './pages/Hardware.jsx'
import Compatibility from './pages/Compatibility.jsx'
import Scanner from './pages/Scanner.jsx'
import Contribute from './pages/Contribute.jsx'
import ErrorDetail from './pages/ErrorDetail.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import ContactUs from './pages/ContactUs.jsx'
import AdSensePolicies from './pages/AdSensePolicies.jsx'
import AIChatbot from './components/AIChatbot.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Footer from './components/Footer.jsx'
import NotFound from './pages/NotFound.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Icon.Dashboard, end: true },
  { to: '/errors', label: 'Error Lookup', icon: Icon.Bug },
  { to: '/bloatware', label: 'Bloatware Cleanup', icon: Icon.Trash },
  { to: '/hardware', label: 'Hardware Guides', icon: Icon.Cpu },
  { to: '/compatibility', label: 'Compatibility', icon: Icon.Check },
  { to: '/scanner', label: 'System Scanner', icon: Icon.Activity },
  { to: '/contribute', label: 'Contribute', icon: Icon.Plus },
]

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const shellClass = `app-shell ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className={shellClass}>
      <div className="sidebar-overlay" onClick={closeMobile} />

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">EF</div>
          <div>
            <div className="brand-name">ErrorFix Pro</div>
            <div className="brand-sub">Diagnostic Companion</div>
          </div>
        </div>

        <nav className="nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobile}
              aria-label={item.label}
            >
              <item.icon aria-hidden="true" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="nav-label" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', padding: '0 16px' }}>
            <Link to="/about" onClick={closeMobile} style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>About Us</Link>
            <Link to="/privacy" onClick={closeMobile} style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/contact" onClick={closeMobile} style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>Contact Us</Link>
            <Link to="/adsense-policies" onClick={closeMobile} style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>AdSense Policies</Link>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="nav-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {theme === 'dark' ? <Icon.Sun aria-hidden="true" /> : <Icon.Moon aria-hidden="true" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
            {theme === 'dark' ? <Icon.Sun aria-hidden="true" /> : <Icon.Moon aria-hidden="true" />}
          </button>
          <button className="collapse-btn" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">
            <Icon.Chevron aria-hidden="true" />
          </button>
        </div>
      </aside>

      <div className="mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open mobile menu">
            <Icon.Menu aria-hidden="true" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="brand-logo" style={{ width: 32, height: 32, fontSize: 14 }}>EF</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>ErrorFix Pro</span>
          </div>
        </div>
        <button className="mobile-menu-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Icon.Sun aria-hidden="true" /> : <Icon.Moon aria-hidden="true" />}
        </button>
      </div>

      <main className="main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/errors" element={<ErrorLookup />} />
            <Route path="/error/:code" element={<ErrorDetail />} />
            <Route path="/bloatware" element={<Bloatware />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/adsense-policies" element={<AdSensePolicies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </main>
      
      <AIChatbot />
      <CookieBanner />
    </div>
  )
}
