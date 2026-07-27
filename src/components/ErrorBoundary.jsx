import React from 'react';
import { Icon } from './Icons.jsx';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '24px'
        }} className="fade-up">
          <Icon.Alert style={{ width: 64, height: 64, color: 'var(--danger)', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '24px', margin: '0 0 16px 0', color: 'var(--text)' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px' }}>
            An unexpected error occurred while rendering this component. Please try refreshing the page to recover.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
