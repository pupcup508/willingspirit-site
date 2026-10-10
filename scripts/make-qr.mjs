// Makes print-ready QR codes (PNG + SVG) for flyers, posters, Canva, etc.
//
//   npm run qr                                    -> codes for the site's domain (astro.config.mjs `site`)
//   npm run qr -- https://something.workers.dev   -> codes for a different address
//
// Output goes to ../qr-codes/ (outside the website itself).
import { mkdir, writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';
import config from '../astro.config.mjs';

const base = process.argv[2] ?? config.site;
const outDir = new URL('../../qr-codes/', import.meta.url);
await mkdir(outDir, { recursive: true });

const targets = { website: '/', donate: '/donate/' };
const options = { margin: 2, errorCorrectionLevel: 'M', color: { dark: '#142a1d', light: '#ffffff' } };

for (const [name, path] of Object.entries(targets)) {
  const url = new URL(path, base).href;
  await writeFile(new URL(`qr-${name}.svg`, outDir), await QRCode.toString(url, { ...options, type: 'svg' }));
  await writeFile(new URL(`qr-${name}.png`, outDir), await QRCode.toBuffer(url, { ...options, width: 1200 }));
  console.log(`✓ qr-${name}.png / .svg → ${url}`);
}
