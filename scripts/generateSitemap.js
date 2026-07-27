import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorDatabase } from '../src/data/errorDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  xml += `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`;
}

for (const error of errorDatabase) {
  xml += `  <url>
    <loc>${baseUrl}/error/${error.code.toLowerCase()}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

xml += `</urlset>`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml);

console.log(`Sitemap generated successfully at ${outputPath}`);
