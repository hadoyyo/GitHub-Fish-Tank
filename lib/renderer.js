const { getLanguageColor, getFishShape } = require('./fish-shapes');

function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function generateAquariumSVG(languageStats, options = {}) {
  const {
    width = 800,
    height = 400,
    bgColor = '#0a192f',
    bgGradient = true,
    showLegend = true,
    showDecorations = true,
    showBubbles = true,
    showRocks = true,
    showPlants = true,
    showCastle = true,
    showChest = true,
    showShell = true,
    shapePreference = {}
  } = options;
  
  const filteredStats = languageStats.filter(stat => stat.percentage > 0.5);
  
  const fishElements = [];
  const legendItems = [];
  
  const swimBounds = {
    minY: 50,
    maxY: height - 100
  };
  
filteredStats.forEach((stat, index) => {
  const { language, percentage } = stat;
  const color = getLanguageColor(language);
  const shapeName = shapePreference[language] || getDefaultShape(index);
  
  const size = Math.max(20, Math.min(45, 20 + (percentage / 100) * 28));
  const scale = size / 30;
  
  const goesRight = index % 2 === 0;
  
  const totalFish = filteredStats.length;
  const yRange = swimBounds.maxY - swimBounds.minY;
  const baseY = swimBounds.minY + (index / Math.max(totalFish - 1, 1)) * yRange;
  const yOffset = (seededRandom(index * 17) - 0.5) * 40;
  const fishY = Math.max(swimBounds.minY, Math.min(swimBounds.maxY, baseY + yOffset));
  
  const swimDuration = 15 + seededRandom(index * 41) * 15;
  const wiggleDuration = 1.5 + seededRandom(index * 53) * 1;
  const startDelay = seededRandom(index * 67) * swimDuration;
  
  const directionScale = goesRight ? 1 : -1;
  
  const startX = goesRight ? -60 : width + 60;
  const endX = goesRight ? width + 60 : -60;
  
  const fishSVG = `
    <g transform="translate(${startX}, ${fishY})">
      <!-- Swimming animation - linear movement across tank -->
      <animateTransform
        attributeName="transform"
        type="translate"
        values="${startX} ${fishY}; ${endX} ${fishY}"
        dur="${swimDuration}s"
        repeatCount="indefinite"
        begin="${startDelay}s"
        additive="replace"
      />
      
      <!-- Scale and direction container -->
      <g transform="scale(${directionScale * scale} ${scale})">
        <!-- Wiggle animation for natural movement -->
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;2;0;-2;0"
            dur="${wiggleDuration}s"
            repeatCount="indefinite"
          />
          ${getFishShape(shapeName, color)}
        </g>
      </g>
      <text x="0" y="22" font-size="11" fill="#8899aa" font-family="monospace" text-anchor="middle" opacity="0.7">${language}</text>
    </g>
  `;
  
  fishElements.push(fishSVG);
  
  // legend
  if (showLegend) {
    legendItems.push(`
      <g transform="translate(10, ${20 + index * 22})">
        <rect x="0" y="0" width="14" height="14" fill="${color}" rx="2" stroke="#000" stroke-width="0.5" />
        <text x="20" y="11" font-size="11" fill="#ccd6f6" font-family="monospace">${language}: ${percentage.toFixed(1)}%</text>
      </g>
    `);
  }
});
  
  // background
  const background = bgGradient 
    ? `
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${adjustColor(bgColor, -15)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(bgColor, -35)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#C4A574;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.15" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
    `
    : `<rect width="100%" height="100%" fill="${bgColor}" />`;
  
  // decorations
  let decorations = '';
  
  if (showDecorations) {
    // sand at bottom
    decorations += `
      <path d="M0,${height-25} Q80,${height-35} 160,${height-28} Q240,${height-38} 320,${height-25} Q400,${height-32} 480,${height-28} Q560,${height-35} 640,${height-25} Q720,${height-30} 800,${height-28} L800,${height} L0,${height} Z" fill="url(#sandGrad)" />
      <ellipse cx="100" cy="${height-20}" rx="30" ry="5" fill="#B89A64" opacity="0.4" />
      <ellipse cx="500" cy="${height-22}" rx="45" ry="6" fill="#B89A64" opacity="0.3" />
      <ellipse cx="700" cy="${height-18}" rx="25" ry="4" fill="#B89A64" opacity="0.4" />
    `;
    
    // rocks
    if (showRocks) {
      decorations += `
        <g transform="translate(50, ${height-50})">
          <ellipse cx="0" cy="15" rx="25" ry="12" fill="#4a5568" />
          <ellipse cx="-8" cy="10" rx="18" ry="10" fill="#5a6578" />
          <ellipse cx="15" cy="8" rx="15" ry="9" fill="#6a7588" />
        </g>
        <g transform="translate(350, ${height-45})">
          <ellipse cx="0" cy="12" rx="20" ry="10" fill="#4a5568" />
          <ellipse cx="12" cy="8" rx="14" ry="8" fill="#5a6578" />
        </g>
        <g transform="translate(650, ${height-55})">
          <ellipse cx="0" cy="18" rx="30" ry="14" fill="#4a5568" />
          <ellipse cx="-10" cy="12" rx="20" ry="11" fill="#5a6578" />
          <ellipse cx="18" cy="10" rx="16" ry="9" fill="#6a7588" />
        </g>
      `;
    }
    
    // plants
    if (showPlants) {
      decorations += `
        <!-- Tall seaweed left -->
        <g transform="translate(80, ${height-60})" opacity="0.85">
          <path d="M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70" stroke="#1d6b3a" stroke-width="6" fill="none">
            <animate attributeName="d" dur="4s" repeatCount="indefinite" values="M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70;M0,60 Q-8,40 -5,20 Q12,0 2,-25 Q-8,-45 5,-70;M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70" />
          </path>
          <path d="M5,60 Q20,35 10,15 Q0,-5 15,-30" stroke="#2d8a4a" stroke-width="4" fill="none">
            <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M5,60 Q20,35 10,15 Q0,-5 15,-30;M5,60 Q15,35 5,15 Q-5,-5 10,-30;M5,60 Q20,35 10,15 Q0,-5 15,-30" />
          </path>
        </g>
        
        <!-- Short plants middle -->
        <g transform="translate(280, ${height-40})" opacity="0.8">
          <path d="M0,40 Q-8,25 0,10 Q8,-5 0,-20" stroke="#1d6b3a" stroke-width="4" fill="none">
            <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M0,40 Q-8,25 0,10 Q8,-5 0,-20;M0,40 Q-5,25 3,10 Q11,-5 3,-20;M0,40 Q-8,25 0,10 Q8,-5 0,-20" />
          </path>
          <path d="M8,40 Q15,28 8,15 Q0,0 10,-15" stroke="#2d8a4a" stroke-width="3" fill="none">
            <animate attributeName="d" dur="3.2s" repeatCount="indefinite" values="M8,40 Q15,28 8,15 Q0,0 10,-15;M8,40 Q12,28 5,15 Q-3,0 7,-15;M8,40 Q15,28 8,15 Q0,0 10,-15" />
          </path>
        </g>
        
        <!-- Tall seaweed right -->
        <g transform="translate(720, ${height-65})" opacity="0.85">
          <path d="M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65" stroke="#1d6b3a" stroke-width="6" fill="none">
            <animate attributeName="d" dur="4.5s" repeatCount="indefinite" values="M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65;M0,65 Q-10,45 2,25 Q14,5 -2,-20 Q-15,-40 3,-65;M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65" />
          </path>
          <path d="M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60" stroke="#2d8a4a" stroke-width="4" fill="none">
            <animate attributeName="d" dur="3.8s" repeatCount="indefinite" values="M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60;M-8,65 Q0,40 -10,20 Q-20,0 -5,-25 Q5,-45 -10,-60;M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60" />
          </path>
        </g>
        
        <!-- Coral-like plants -->
        <g transform="translate(550, ${height-50})" opacity="0.75">
          <ellipse cx="0" cy="0" rx="15" ry="25" fill="#c44569" />
          <ellipse cx="12" cy="5" rx="10" ry="18" fill="#e84a5f" />
          <ellipse cx="-10" cy="8" rx="8" ry="15" fill="#ff847c" />
        </g>
      `;
    }
    
    // castle
    if (showCastle) {
      decorations += `
        <g transform="translate(180, ${height-95})">
          <rect x="0" y="40" width="60" height="55" fill="#6b7c8c" stroke="#4a5568" stroke-width="1" />
          <rect x="-15" y="55" width="25" height="40" fill="#7b8c9c" stroke="#4a5568" stroke-width="1" />
          <rect x="50" y="55" width="25" height="40" fill="#7b8c9c" stroke="#4a5568" stroke-width="1" />
          <rect x="5" y="15" width="20" height="35" fill="#8b9cac" stroke="#4a5568" stroke-width="1" />
          <rect x="35" y="20" width="18" height="30" fill="#8b9cac" stroke="#4a5568" stroke-width="1" />
          <polygon points="15,15 5,15 10,0 20,0 25,15" fill="#5a6b7c" />
          <polygon points="44,20 35,20 38,8 50,8 53,20" fill="#5a6b7c" />
          <rect x="11" y="25" width="8" height="12" rx="4" fill="#1a1a2e" />
          <rect x="40" y="28" width="6" height="10" rx="3" fill="#1a1a2e" />
          <rect x="22" y="65" width="16" height="25" rx="8" fill="#1a1a2e" />
          <rect x="-15" y="50" width="6" height="8" fill="#6b7c8c" />
          <rect x="-5" y="50" width="6" height="8" fill="#6b7c8c" />
          <rect x="55" y="50" width="6" height="8" fill="#6b7c8c" />
          <rect x="65" y="50" width="6" height="8" fill="#6b7c8c" />
        </g>
      `;
    }
    
    // treasure Chest
    if (showChest) {
      decorations += `
        <g transform="translate(420, ${height-55})">
          <rect x="0" y="15" width="40" height="25" fill="#8B4513" stroke="#5D2E0C" stroke-width="1.5" rx="2" />
          <path d="M-2,15 Q20,0 42,15 L40,15 L0,15 Z" fill="#A0522D" stroke="#5D2E0C" stroke-width="1" />
          <rect x="0" y="20" width="40" height="4" fill="#DAA520" />
          <rect x="0" y="30" width="40" height="3" fill="#DAA520" />
          <circle cx="20" cy="22" r="4" fill="#FFD700" stroke="#B8860B" stroke-width="1" />
          <rect x="18" y="22" width="4" height="6" fill="#FFD700" />
          <circle cx="8" cy="12" r="4" fill="#FFD700" stroke="#B8860B" stroke-width="0.5" />
          <circle cx="15" cy="10" r="3" fill="#FFD700" stroke="#B8860B" stroke-width="0.5" />
          <circle cx="25" cy="11" r="4" fill="#FFD700" stroke="#B8860B" stroke-width="0.5" />
          <circle cx="32" cy="13" r="3" fill="#FFD700" stroke="#B8860B" stroke-width="0.5" />
        </g>
      `;
    }
    
    // shell
    if (showShell) {
      decorations += `
        <g transform="translate(600, ${height-38})">
          <ellipse cx="0" cy="8" rx="18" ry="12" fill="#F5DEB3" stroke="#DEB887" stroke-width="1" />
          <path d="M-15,8 Q0,-8 15,8" fill="none" stroke="#DEB887" stroke-width="1" />
          <path d="M-12,5 Q0,-4 12,5" fill="none" stroke="#D2B48C" stroke-width="0.8" />
          <path d="M-9,3 Q0,-2 9,3" fill="none" stroke="#D2B48C" stroke-width="0.6" />
          <circle cx="0" cy="6" r="5" fill="#FFEFD5" stroke="#FFE4B5" stroke-width="0.5" />
          <circle cx="-1" cy="4" r="1.5" fill="#FFF" opacity="0.8" />
        </g>
      `;
    }
    
    // bubbles
    if (showBubbles) {
      decorations += `
        <g>
          <circle cx="120" cy="200" r="4" fill="none" stroke="#aaddff" stroke-width="0.8" opacity="0.6">
            <animate attributeName="cy" from="${height-30}" to="30" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="125" cy="220" r="2.5" fill="none" stroke="#aaddff" stroke-width="0.6" opacity="0.5">
            <animate attributeName="cy" from="${height-25}" to="40" dur="5.5s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="opacity" from="0.5" to="0" dur="5.5s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="118" cy="240" r="3" fill="none" stroke="#aaddff" stroke-width="0.7" opacity="0.4">
            <animate attributeName="cy" from="${height-20}" to="35" dur="4.8s" repeatCount="indefinite" begin="0.6s" />
            <animate attributeName="opacity" from="0.4" to="0" dur="4.8s" repeatCount="indefinite" begin="0.6s" />
          </circle>
        </g>
        <g>
          <circle cx="380" cy="150" r="3" fill="none" stroke="#aaddff" stroke-width="0.7" opacity="0.5">
            <animate attributeName="cy" from="${height-35}" to="45" dur="6s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" from="0.5" to="0" dur="6s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="385" cy="180" r="2" fill="none" stroke="#aaddff" stroke-width="0.5" opacity="0.4">
            <animate attributeName="cy" from="${height-28}" to="50" dur="5.2s" repeatCount="indefinite" begin="1.5s" />
            <animate attributeName="opacity" from="0.4" to="0" dur="5.2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
        </g>
        <g>
          <circle cx="580" cy="120" r="3.5" fill="none" stroke="#aaddff" stroke-width="0.8" opacity="0.6">
            <animate attributeName="cy" from="${height-40}" to="25" dur="4.5s" repeatCount="indefinite" begin="2s" />
            <animate attributeName="opacity" from="0.6" to="0" dur="4.5s" repeatCount="indefinite" begin="2s" />
          </circle>
          <circle cx="575" cy="140" r="2" fill="none" stroke="#aaddff" stroke-width="0.5" opacity="0.4">
            <animate attributeName="cy" from="${height-32}" to="35" dur="5s" repeatCount="indefinite" begin="2.3s" />
            <animate attributeName="opacity" from="0.4" to="0" dur="5s" repeatCount="indefinite" begin="2.3s" />
          </circle>
          <circle cx="588" cy="160" r="2.8" fill="none" stroke="#aaddff" stroke-width="0.6" opacity="0.5">
            <animate attributeName="cy" from="${height-25}" to="40" dur="5.8s" repeatCount="indefinite" begin="2.6s" />
            <animate attributeName="opacity" from="0.5" to="0" dur="5.8s" repeatCount="indefinite" begin="2.6s" />
          </circle>
        </g>
        <g>
          <circle cx="750" cy="180" r="2.5" fill="none" stroke="#aaddff" stroke-width="0.6" opacity="0.5">
            <animate attributeName="cy" from="${height-30}" to="50" dur="6.5s" repeatCount="indefinite" begin="0.8s" />
            <animate attributeName="opacity" from="0.5" to="0" dur="6.5s" repeatCount="indefinite" begin="0.8s" />
          </circle>
        </g>
      `;
    }
  }
  
  // glass frame effect
  const glassFrame = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#3a4a5a" stroke-width="8" />
    <rect x="4" y="4" width="${width-8}" height="${height-8}" fill="none" stroke="#5a7a8a" stroke-width="2" opacity="0.3" />
    <rect x="0" y="0" width="${width}" height="15" fill="url(#reflectionGrad)" />
  `;
  
  // compose everything
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${background}
      ${decorations}
      
      <!-- Fish -->
      ${fishElements.join('\n')}
      
      <!-- Legend -->
      ${showLegend ? `
        <g transform="translate(${width - 180}, 15)">
          <rect x="0" y="0" width="170" height="${legendItems.length * 22 + 18}" fill="rgba(10, 25, 47, 0.85)" rx="6" stroke="#3a4a5a" stroke-width="1" />
          ${legendItems.join('\n')}
        </g>
      ` : ''}
      
      ${glassFrame}
      
      <!-- Signature -->
      <text x="${width/2}" y="${height-8}" text-anchor="middle" font-size="9" fill="#8899aa" font-family="monospace" opacity="0.5">
        GitHub Fish Tank | ${new Date().toISOString().split('T')[0]}
      </text>
    </svg>
  `;
  
  return svg;
}

function adjustColor(hex, percent) {
  let R = parseInt(hex.substring(1,3), 16);
  let G = parseInt(hex.substring(3,5), 16);
  let B = parseInt(hex.substring(5,7), 16);
  
  R = Math.max(0, Math.min(255, R + percent));
  G = Math.max(0, Math.min(255, G + percent));
  B = Math.max(0, Math.min(255, B + percent));
  
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

function getDefaultShape(index) {
  const shapes = ['default', 'round', 'long', 'angel', 'tetra'];
  return shapes[index % shapes.length];
}

module.exports = { generateAquariumSVG };
