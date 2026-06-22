import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#060e24"/>
      <stop offset="100%" style="stop-color:#0d1b3e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1e3a8a"/>
      <stop offset="100%" style="stop-color:#4f46e5"/>
    </linearGradient>
    <linearGradient id="greenLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22c55e"/>
      <stop offset="100%" style="stop-color:#16a34a"/>
    </linearGradient>
    <radialGradient id="glow1" cx="70%" cy="30%" r="40%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:0.25"/>
      <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="20%" cy="80%" r="35%">
      <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Decorative tyre rings (right side) -->
  <circle cx="980" cy="315" r="280" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="60"/>
  <circle cx="980" cy="315" r="180" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="40"/>
  <circle cx="980" cy="315" r="90"  fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="20"/>

  <!-- Subtle dot grid -->
  <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.035)"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="5" fill="url(#accent)"/>

  <!-- Left green bar accent -->
  <rect x="72" y="140" width="5" height="220" rx="3" fill="url(#greenLine)"/>

  <!-- MATRIX wordmark -->
  <text x="96" y="220" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="86" letter-spacing="-2" fill="white">MATRIX</text>

  <!-- MOBILE TYRES subtitle -->
  <text x="97" y="278" font-family="Arial, sans-serif" font-weight="400" font-size="34" letter-spacing="8" fill="rgba(148,163,184,0.85)">MOBILE TYRES</text>

  <!-- Divider line -->
  <rect x="96" y="308" width="520" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>

  <!-- Tagline -->
  <text x="96" y="360" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="rgba(255,255,255,0.9)">We come to you, wherever you are.</text>

  <!-- Feature pills row -->
  <!-- Pill 1: 7 Days -->
  <rect x="96" y="392" width="175" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <circle cx="122" cy="414" r="8" fill="#22c55e"/>
  <text x="140" y="420" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="rgba(255,255,255,0.85)">7 Days a Week</text>

  <!-- Pill 2: Emergency -->
  <rect x="284" y="392" width="205" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <circle cx="310" cy="414" r="8" fill="#f59e0b"/>
  <text x="328" y="420" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="rgba(255,255,255,0.85)">Emergency Callout</text>

  <!-- Pill 3: Coventry -->
  <rect x="504" y="392" width="220" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <circle cx="530" cy="414" r="8" fill="#60a5fa"/>
  <text x="548" y="420" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="rgba(255,255,255,0.85)">Coventry &amp; 15 miles</text>

  <!-- Bottom bar -->
  <rect x="0" y="540" width="1200" height="90" fill="rgba(0,0,0,0.35)"/>

  <!-- Phone icon path approximation as circle -->
  <circle cx="116" cy="585" r="22" fill="url(#accent)"/>
  <!-- Phone symbol (simple) -->
  <text x="107" y="591" font-family="Arial, sans-serif" font-size="18" fill="white">📞</text>

  <text x="148" y="579" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="white">07721 570075</text>
  <text x="148" y="601" font-family="Arial, sans-serif" font-weight="400" font-size="16" fill="rgba(148,163,184,0.7)">matrixmobiletyres.co.uk</text>

  <!-- Star rating -->
  <text x="820" y="579" font-family="Arial, sans-serif" font-size="26" fill="#fbbf24">★★★★★</text>
  <text x="830" y="601" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="rgba(255,255,255,0.7)">5.0 Rated · Coventry</text>
</svg>`;

const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg');

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath);

console.log('✓ og-image.jpg written to public/');
