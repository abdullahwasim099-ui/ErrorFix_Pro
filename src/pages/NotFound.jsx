import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page notfound">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="button button--primary">Go to Dashboard</Link>
    </section>
  );
}