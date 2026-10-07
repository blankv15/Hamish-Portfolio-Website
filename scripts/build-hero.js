// Rebuilds the hero graphic with a new photo, keeping the "Hamish Chhagan"
// name and hand-drawn arrow from the original design (hero9.png).
//
// Usage: node scripts/build-hero.js <photo> [outName=hero10] [focusY=0.35]
//   focusY: vertical crop position, 0 = keep top of photo, 1 = keep bottom.
// Outputs <outName>.webp (1x) and <outName>@2x.webp into the hero folder.

const sharp = require('sharp');
const path = require('path');

const HERO_DIR = path.join(__dirname, '../backend/public/images/hero');
const TEMPLATE = path.join(HERO_DIR, 'hero9.png');

// Rounded photo frame inside the template, measured from hero9.png (1x px)
const FRAME = { x: 33.3, y: 67, w: 504.2, h: 348.1, r: 22 };
// Where the arrowhead overlaps the photo
const ARROW_ZONE = { x0: 30, y0: 60, x1: 90, y1: 170 };
const SCALES = [1, 2];
const WEBP_QUALITY = 88;
const SHADOW_OPACITY = 0.45;

function inFrame(x, y, grow = 0) {
  const cx = x + 0.5, cy = y + 0.5;
  const r = FRAME.r + grow;
  const left = FRAME.x - grow, top = FRAME.y - grow;
  const right = FRAME.x + FRAME.w + grow, bottom = FRAME.y + FRAME.h + grow;
  if (cx < left || cx > right || cy < top || cy > bottom) return false;
  const dx = Math.max(left + r - cx, 0, cx - (right - r));
  const dy = Math.max(top + r - cy, 0, cy - (bottom - r));
  return dx * dx + dy * dy <= r * r;
}

// Name + arrow on a transparent background, with the old photo removed.
// Also returns the arrowhead's silhouette so it can cast a shadow on light photos.
async function extractOverlay() {
  const { data, info } = await sharp(TEMPLATE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);
  const shadow = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (!inFrame(x, y, 1.5)) {
        data.copy(out, i, i, i + 4);
        continue;
      }
      // Inside the frame keep only the white arrow pixels
      const inZone = x >= ARROW_ZONE.x0 && x < ARROW_ZONE.x1 && y >= ARROW_ZONE.y0 && y < ARROW_ZONE.y1;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (inZone && lum > 200) {
        out[i] = out[i + 1] = out[i + 2] = 255;
        out[i + 3] = data[i + 3];
        shadow[i + 3] = data[i + 3];
      }
    }
  }
  return { buffer: out, shadow, width, height };
}

async function buildPhoto(photoPath, scale, focusY) {
  const fw = Math.round(FRAME.w * scale);
  const fh = Math.round(FRAME.h * scale);
  const meta = await sharp(photoPath).rotate().metadata();
  const [pw, ph] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];

  // Cover-fit the frame, then crop at the requested vertical position
  const s = Math.max(fw / pw, fh / ph);
  const rw = Math.ceil(pw * s), rh = Math.ceil(ph * s);
  const left = Math.round((rw - fw) / 2);
  const top = Math.round((rh - fh) * focusY);

  const mask = Buffer.from(
    `<svg width="${fw}" height="${fh}"><rect width="${fw}" height="${fh}" rx="${FRAME.r * scale}" fill="#fff"/></svg>`
  );
  return sharp(photoPath)
    .rotate()
    .resize(rw, rh)
    .extract({ left, top, width: fw, height: fh })
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function main() {
  const [photoPath, outName = 'hero10', focusArg = '0.35'] = process.argv.slice(2);
  if (!photoPath) {
    console.error('Usage: node scripts/build-hero.js <photo> [outName] [focusY]');
    process.exit(1);
  }
  const focusY = Number(focusArg);
  const overlay = await extractOverlay();
  const raw = { raw: { width: overlay.width, height: overlay.height, channels: 4 } };
  const overlayPng = await sharp(overlay.buffer, raw).png().toBuffer();
  const shadowPng = await sharp(overlay.shadow, raw).png().toBuffer();

  for (const scale of SCALES) {
    const width = overlay.width * scale;
    const height = overlay.height * scale;
    const photo = await buildPhoto(photoPath, scale, focusY);
    const scaledOverlay = await sharp(overlayPng).resize(width, height, { kernel: 'lanczos3' }).toBuffer();
    const scaledShadow = await sharp(shadowPng)
      .resize(width, height)
      .blur(1.5 * scale)
      .linear([1, 1, 1, SHADOW_OPACITY], [0, 0, 0, 0])
      .png()
      .toBuffer();

    const suffix = scale === 1 ? '' : `@${scale}x`;
    const outPath = path.join(HERO_DIR, `${outName}${suffix}.webp`);
    await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([
        { input: photo, left: Math.round(FRAME.x * scale), top: Math.round(FRAME.y * scale) },
        { input: scaledShadow, left: scale, top: scale },
        { input: scaledOverlay, left: 0, top: 0 },
      ])
      .webp({ quality: WEBP_QUALITY, alphaQuality: 100, effort: 6 })
      .toFile(outPath);
    console.log(`✓ ${path.relative(process.cwd(), outPath)} (${width}x${height})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
