import { NavLink, Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          <span>ErrorFix Pro</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className="nav-link" exact isActive>
            Dashboard
          </NavLink>
          <NavLink to="/errors" className="nav-link" isActive>
            Errors
          </NavLink>
          <NavLink to="/bloatware" className="nav-link" isActive>
            Bloatware
          </NavLink>
          <NavLink to="/scanner" className="nav-link" isActive>
            Scanner
          </NavLink>
          <NavLink to="/hardware" className="nav-link" isActive>
            Hardware
          </NavLink>
          <NavLink to="/contribute" className="nav-link" isActive>
            Contribute
          </NavLink>
        </nav>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>
          <NavLink to="/about">About</NavLink> ·
          <NavLink to="/compatibility">Compatibility</NavLink>
        </span>
        <span>© 2025 ErrorFix Pro. All rights reserved.</span>
      </footer>
    </div>
  );
}