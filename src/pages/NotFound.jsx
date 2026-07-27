import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '../components/Icons.jsx';
import { SEO } from '../components/SEO.jsx';

export default function NotFound() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/errors?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fade-up" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '24px'
    }}>
      <SEO title="404 - Page Not Found | ErrorFix Pro" />
      <Icon.Empty style={{ width: 80, height: 80, color: 'var(--border-soft)', marginBottom: '24px' }} />
      <h2 style={{ fontSize: '32px', margin: '0 0 16px 0', color: 'var(--text)' }}>404: Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '500px', fontSize: '16px', lineHeight: 1.5 }}>
        The page or error code you are looking for doesn't exist or has been moved. Try searching for your Windows error code below or return to the dashboard.
      </p>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '400px', marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="e.g. 0x80070005"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">
          <Icon.Search style={{ width: 16, height: 16 }} /> Search
        </button>
      </form>

      <Link to="/" className="btn" style={{ background: 'var(--bg-elev-2)', border: '1px solid var(--border-soft)', color: 'var(--text)' }}>
        <Icon.Dashboard style={{ width: 16, height: 16 }} /> Back to Dashboard
      </Link>
    </div>
  );
}
