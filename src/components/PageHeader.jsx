import { Helmet } from 'react-helmet-async';

export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title} | ErrorFix Pro</title>
        <meta name="description" content={description || ''} />
      </Helmet>
      <header className="page-header">
        <div className="page-header__content">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-subtitle">{description}</p>}
        </div>
      </header>
      {children}
    </>
  );
}