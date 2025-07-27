#!/usr/bin/env node

/**
 * Generate placeholder images for development
 * This creates simple SVG placeholders for all required images
 */

const fs = require('fs');
const path = require('path');

const placeholders = [
  // Project images
  { path: 'public/assets/images/projects/digital-literacy.jpg', width: 800, height: 600, text: 'Digital Literacy Project' },
  { path: 'public/assets/images/projects/green-city.jpg', width: 800, height: 600, text: 'Green City Initiative' },
  { path: 'public/assets/images/projects/mental-health.jpg', width: 800, height: 600, text: 'Mental Health Matters' },
  { path: 'public/assets/images/projects/code-for-good.jpg', width: 800, height: 600, text: 'Code for Good' },
  { path: 'public/assets/images/projects/community-kitchen.jpg', width: 800, height: 600, text: 'Community Kitchen' },
  { path: 'public/assets/images/projects/youth-entrepreneur.jpg', width: 800, height: 600, text: 'Youth Entrepreneurship' },
  
  // Partner logos
  { path: 'public/assets/images/partners/un-logo.png', width: 200, height: 100, text: 'UN', bg: '#ffffff' },
  { path: 'public/assets/images/partners/worldbank-logo.png', width: 200, height: 100, text: 'World Bank', bg: '#ffffff' },
  { path: 'public/assets/images/partners/gov-logo.png', width: 200, height: 100, text: 'Government', bg: '#ffffff' },
  { path: 'public/assets/images/partners/tech-logo.png', width: 200, height: 100, text: 'Tech Partner', bg: '#ffffff' },
  { path: 'public/assets/images/partners/green-logo.png', width: 200, height: 100, text: 'Green Foundation', bg: '#ffffff' },
  { path: 'public/assets/images/partners/edu-logo.png', width: 200, height: 100, text: 'Education Trust', bg: '#ffffff' },
  { path: 'public/assets/images/partners/health-logo.png', width: 200, height: 100, text: 'Health Initiative', bg: '#ffffff' },
  { path: 'public/assets/images/partners/innovation-logo.png', width: 200, height: 100, text: 'Innovation Lab', bg: '#ffffff' },
];

function generateSVG(width, height, text, bg = '#f3f4f6') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#6b7280">
    ${text}
  </text>
</svg>`;
}

function svgToDataURL(svg) {
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function dataURLToBuffer(dataURL) {
  const base64 = dataURL.split(',')[1];
  return Buffer.from(base64, 'base64');
}

console.log('🎨 Generating placeholder images...\n');

placeholders.forEach(({ path: filePath, width, height, text, bg }) => {
  const dir = path.dirname(filePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filePath} (already exists)`);
    return;
  }
  
  // Generate and save SVG as image
  const svg = generateSVG(width, height, text, bg);
  const dataURL = svgToDataURL(svg);
  
  // For now, save as SVG since we can't convert to JPG/PNG without additional dependencies
  const svgPath = filePath.replace(/\.(jpg|png)$/, '.svg');
  fs.writeFileSync(svgPath, svg);
  
  console.log(`✅ Created ${svgPath}`);
});

console.log('\n✨ Placeholder generation complete!');
console.log('\n📌 Note: SVG placeholders have been created. For production, replace these with actual JPG/PNG images.');