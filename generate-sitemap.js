import fs from 'fs';
import { errorDatabase } from './src/data/errorDatabase.js';

const baseUrl = 'https://errorfixerpro.co.uk';
const staticRoutes = [
  '/',
  '/errors',
  '/bloatware',
  '/hardware',
  '/compatibility',
  '/scanner',
  '/contribute',
  '/about',
  '/privacy',
  '/contact'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const route of staticRoutes) {
  xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
}

for (const error of errorDatabase) {
  xml += `  <url>\n    <loc>${baseUrl}/error/${error.code.toLowerCase()}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
}

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('Sitemap generated successfully.');
