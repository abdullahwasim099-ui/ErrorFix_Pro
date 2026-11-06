import fs from 'fs';
import path from 'path';

export const ROUTES = [
  '/',
  '/errors',
  '/bloatware',
  '/hardware',
  '/compatibility',
  '/scanner',
  '/contribute',
  '/about'
];

const BASE_URL = 'https://errorfixerpro.co.uk';

export function buildSitemap(routes = ROUTES, baseUrl = BASE_URL) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach((route, i) => {
    const priority = i === 0 ? '1.0' : '0.8';
    xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  });

  xml += `</urlset>\n`;

  const publicDir = path.join(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('Sitemap generated successfully.');
}

// When run directly (e.g. `node generate-sitemap.js`), generate the sitemap
buildSitemap();