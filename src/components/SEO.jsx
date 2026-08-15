import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({ 
  title, 
  description, 
  canonical, 
  schemaData, 
  image = 'https://errorfixerpro.co.uk/icon-512.png',
  type = 'website',
  publishedTime,
  section
}) {
  // Enforce lowercase, strict HTTPS, no trailing slash (unless it's exactly the root domain)
  const formatCanonical = (url) => {
    if (!url) return '';
    let formatted = url.toLowerCase().trim();
    if (formatted.endsWith('/') && formatted !== 'https://errorfixerpro.co.uk/') {
      formatted = formatted.slice(0, -1);
    }
    return formatted;
  };

  const safeCanonical = formatCanonical(canonical);

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {safeCanonical && <link rel="canonical" href={safeCanonical} />}
      
      {/* Open Graph & Social Cards */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {safeCanonical && <meta property="og:url" content={safeCanonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ErrorFix Pro" />
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Schema */}
      {schemaData && schemaData.map((schema, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
