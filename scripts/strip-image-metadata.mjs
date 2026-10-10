// Strips EXIF/GPS/XMP/IPTC metadata from images so photos never reveal where they were taken.
// Also applies the photo's rotation and shrinks anything larger than 1600px.
//
//   node scripts/strip-image-metadata.mjs              -> every image in public/images
//   node scripts/strip-image-metadata.mjs a.jpg b.png  -> just these files
//
// Runs automatically before every build (prebuild) and on every commit (.githooks/pre-commit).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const IMAGE_DIR = 'public/images';
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const BLOCKED = new Set(['.heic', '.heif']);
const MAX_SIZE = 1600;

const args = process.argv.slice(2);
const files = args.length ? args : (await readdir(IMAGE_DIR, { recursive: true })).map((f) => join(IMAGE_DIR, f));

let failed = false;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (BLOCKED.has(ext)) {
    console.error(`✗ ${file}: HEIC photos aren't supported on the web. Export it as JPEG first.`);
    failed = true;
    continue;
  }
  if (!SUPPORTED.has(ext)) continue;

  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const tooBig = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_SIZE;
  if (!meta.exif && !meta.xmp && !meta.iptc && !tooBig) continue;

  // sharp drops all metadata unless told to keep it; rotate() bakes in the EXIF orientation first.
  let image = sharp(input).rotate().resize({ width: MAX_SIZE, height: MAX_SIZE, fit: 'inside', withoutEnlargement: true });
  image = ext === '.png' ? image.png() : ext === '.webp' ? image.webp({ quality: 82 }) : image.jpeg({ quality: 82, mozjpeg: true });
  await writeFile(file, await image.toBuffer());
  console.log(`✓ cleaned ${file}${meta.exif ? ' (removed EXIF/GPS)' : ''}`);
}

if (failed) process.exit(1);
