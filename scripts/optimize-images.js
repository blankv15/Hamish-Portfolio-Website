const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../backend/public/images');
const OUTPUT_DIR = path.join(__dirname, '../backend/public/images-optimized');

// Quality settings
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;
const PNG_QUALITY = 85;

async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const outputWebP = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Processing: ${path.relative(INPUT_DIR, inputPath)} (${metadata.width}x${metadata.height})`);

    // Resize if image is too large (max 1920px width)
    const maxWidth = 1920;
    const shouldResize = metadata.width > maxWidth;

    if (shouldResize) {
      image.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP (best compression + quality)
    await image
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(outputWebP);

    // Also keep optimized original format as fallback
    if (ext === '.png') {
      await sharp(inputPath)
        .resize(shouldResize ? maxWidth : null, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .resize(shouldResize ? maxWidth : null, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(outputPath);
    }

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputWebP).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`  ✓ WebP: ${formatBytes(webpSize)} (${savings}% smaller)`);

  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = path.join(dir, entry.name);
    const relativePath = path.relative(INPUT_DIR, inputPath);
    const outputPath = path.join(OUTPUT_DIR, relativePath);

    if (entry.isDirectory()) {
      // Create output directory
      fs.mkdirSync(outputPath, { recursive: true });
      await processDirectory(inputPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      // Ensure output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      await optimizeImage(inputPath, outputPath);
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  // Create output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  await processDirectory(INPUT_DIR);

  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review the optimized images');
  console.log('   2. Replace the original images directory with the optimized one');
  console.log('   3. Update image references to use .webp format with fallbacks');
}

main().catch(console.error);
