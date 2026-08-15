import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorDatabase } from '../src/data/errorDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://errorfixerpro.co.uk';
const date = new Date().toISOString();

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
  '/contact',
  '/adsense-policies'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${errorDatabase.map(e => `  <url>
    <loc>${DOMAIN}/error/${e.code.toLowerCase()}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`Sitemap generated successfully at ${outputPath}`);
