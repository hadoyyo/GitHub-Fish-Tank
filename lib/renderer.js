const { getLanguageColor, getFishShape, resolveShapeForLanguage } = require('./fish-shapes');
const { renderDecorations } = require('./decorations');
const { buildFishRoute, planSwim } = require('./swim');

function adjustColor(hex, amount) {
  hex = hex.replace(/^#/, '');
  
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function formatLanguageName(language) {
  const words = language.split(' ');
  if (words.length === 1) {
    return language;
  }
  return `${words[0]} ${words[1].charAt(0)}.`;
}

function generateAquariumSVG(languageStats, options = {}) {
  const {
    width = 800,
    height = 400,
    bgColor = '#4ECDC4',
    frameColor = '#3a4a5a',
    sandColor = '#C4A574',
    bgGradient = true,
    showLegend = true,
    showLanguageLabels = true,
    showDecorations = true,
    showBubbles = true,
    showRocks = true,
    showPlants = true,
    showPlantsAlt = false,
    showCastle = true,
    showShip = false,
    showChest = true,
    showAnubias = false,
    showShell = true,
    showStatue = false,
    showFrame = true,
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
    const shapeName = resolveShapeForLanguage(language, shapePreference, index);
    const displayName = formatLanguageName(language);

    const size = 22 + Math.pow(percentage / 100, 0.6) * 53;
    const scale = size / 30;

    const baseDelay = 3;
    const fadeDelay = index * baseDelay + seededRandom(index * 13) * 3;

    // a seeded wandering loop: turns anywhere in the tank, varying speed, depth and pauses (lib/swim.js);
    // motion, turning and pitch share one timeline, so a fish never swims backwards
    const route = buildFishRoute(index, width, height, swimBounds, seededRandom);
    const swim = planSwim(route);
    const swimDuration = +swim.duration.toFixed(3);
    const list = (xs, digits = 4) => xs.map(v => +v.toFixed(digits)).join(';');

    const sx = scale;   // facing +1 = the shape's own orientation (nose right)
    const sy = scale;

    const labelFontSize = Math.max(10, Math.min(14, Math.round(10 + scale * 1.4)));
    const labelY = Math.round(scale * 16 + 12);

    const fishSVG = `
    <g opacity="0">

      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur="1.5s"
        begin="${fadeDelay}s"
        fill="freeze"
      />

      <animateMotion
        dur="${swimDuration}s"
        repeatCount="indefinite"
        begin="${fadeDelay}s"
        calcMode="spline"
        keyPoints="${list(swim.motion.keyPoints)}"
        keyTimes="${list(swim.motion.keyTimes)}"
        keySplines="${swim.motion.keySplines.join(';')}"
        path="${route.d}"
      />

      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="${swim.pitch.values.join(';')}"
          keyTimes="${list(swim.pitch.keyTimes)}"
          dur="${swimDuration}s"
          repeatCount="indefinite"
          begin="${fadeDelay}s"
        />
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="${swim.facing.values.map(f => `${+(sx * f).toFixed(3)} ${+sy.toFixed(3)}`).join(';')}"
            keyTimes="${list(swim.facing.keyTimes, 5)}"
            dur="${swimDuration}s"
            repeatCount="indefinite"
            begin="${fadeDelay}s"
          />
          ${getFishShape(shapeName, color)}
        </g>
      </g>

      ${showLanguageLabels ? `
      <text
        x="0"
        y="${labelY}"
        font-size="${labelFontSize}"
        font-weight="600"
        fill="#ffffff"
        font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        text-anchor="middle"
        letter-spacing="0.4"
        paint-order="stroke fill"
        stroke="rgba(0, 0, 0, 0.55)"
        stroke-width="2.5"
        stroke-linejoin="round"
      >
        ${language}
      </text>
      ` : ''}
    </g>
  `;

    fishElements.push(fishSVG);

    if (showLegend) {
      const yOffset = 34 + index * 30;
      const progressWidth = Math.max(4, Math.round(156 * percentage / 100));
      
      legendItems.push(`
      <g transform="translate(14, ${yOffset})">
        <!-- Color pill -->
        <rect x="0" y="-9" width="10" height="10" rx="3" fill="${color}" stroke="rgba(255,255,255,0.25)" stroke-width="0.5" />
        
        <!-- Language name -->
        <text x="16" y="0" font-size="12" font-weight="600" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.2">${displayName}</text>
        
        <!-- Percentage -->
        <text x="172" y="0" font-size="11" font-weight="500" fill="rgba(255, 255, 255, 0.75)" font-family="system-ui, -apple-system, sans-serif" text-anchor="end">${percentage.toFixed(1)}%</text>
        
        <!-- Mini progress bar -->
        <rect x="16" y="5" width="156" height="2.5" rx="1.25" fill="rgba(255, 255, 255, 0.12)" />
        <rect x="16" y="5" width="${progressWidth}" height="2.5" rx="1.25" fill="${color}" />
      </g>
    `);
    }
  });

  const background = bgGradient
    ? `
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${adjustColor(bgColor, 15)};stop-opacity:1" />
          <stop offset="40%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="85%" style="stop-color:${adjustColor(bgColor, -25)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(bgColor, -40)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.18" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
    `
    : `<rect width="100%" height="100%" fill="${bgColor}" />`;

  // sand + decorations (lib/decorations.js); bubbles are appended below, fish come after
  let decorations = renderDecorations({
    bgColor, sandColor,
    showRocks, showPlants, showPlantsAlt,
    showCastle, showShip, showChest, showAnubias,
    showShell, showStatue
  });

  if (showBubbles) {
    decorations += `
      <g>
        <circle cx="120" cy="${height-30}" r="4" fill="#adf" opacity=".6">
          <animate attributeName="cy" from="${height-30}" to="25" dur="4.8s" repeatCount="indefinite" />
          <animate attributeName="cx" values="120; 123; 117; 121; 120" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from=".65" to="0" dur="4.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="125" cy="${height-25}" r="2.5" fill="#adf" opacity=".5">
          <animate attributeName="cy" from="${height-25}" to="35" dur="5.3s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="cx" values="125; 122; 127; 124; 125" dur="2.6s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="opacity" from=".55" to="0" dur="5.3s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="118" cy="${height-20}" r="3" fill="#adf" opacity=".4">
          <animate attributeName="cy" from="${height-20}" to="30" dur="4.5s" repeatCount="indefinite" begin="0.7s" />
          <animate attributeName="cx" values="118; 121; 116; 119; 118" dur="2.2s" repeatCount="indefinite" begin="0.7s" />
          <animate attributeName="opacity" from=".5" to="0" dur="4.5s" repeatCount="indefinite" begin="0.7s" />
        </circle>
      </g>
      <g>
        <circle cx="380" cy="${height-35}" r="3.2" fill="#adf" opacity="0.55">
          <animate attributeName="cy" from="${height-35}" to="35" dur="5.6s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="cx" values="380; 384; 378; 382; 380" dur="2.8s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" from="0.55" to="0" dur="5.6s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="385" cy="${height-28}" r="2" fill="#adf" opacity="0.45">
          <animate attributeName="cy" from="${height-28}" to="40" dur="5s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="cx" values="385; 382; 387; 384; 385" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="opacity" from="0.45" to="0" dur="5s" repeatCount="indefinite" begin="1.5s" />
        </circle>
      </g>
      <g>
        <circle cx="580" cy="${height-40}" r="3.5" fill="#adf" opacity="0.6">
          <animate attributeName="cy" from="${height-40}" to="25" dur="4.4s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="cx" values="580; 583; 577; 582; 580" dur="2.2s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="opacity" from="0.6" to="0" dur="4.4s" repeatCount="indefinite" begin="2s" />
        </circle>
        <circle cx="575" cy="${height-32}" r="2" fill="#adf" opacity="0.4">
          <animate attributeName="cy" from="${height-32}" to="35" dur="5.1s" repeatCount="indefinite" begin="2.3s" />
          <animate attributeName="cx" values="575; 578; 573; 576; 575" dur="2.5s" repeatCount="indefinite" begin="2.3s" />
          <animate attributeName="opacity" from="0.4" to="0" dur="5.1s" repeatCount="indefinite" begin="2.3s" />
        </circle>
        <circle cx="588" cy="${height-25}" r="2.8" fill="#adf" opacity="0.5">
          <animate attributeName="cy" from="${height-25}" to="30" dur="5.5s" repeatCount="indefinite" begin="2.7s" />
          <animate attributeName="cx" values="588; 585; 590; 587; 588" dur="2.7s" repeatCount="indefinite" begin="2.7s" />
          <animate attributeName="opacity" from="0.5" to="0" dur="5.5s" repeatCount="indefinite" begin="2.7s" />
        </circle>
      </g>
      <g>
        <circle cx="750" cy="${height-30}" r="2.5" fill="#adf" opacity="0.5">
          <animate attributeName="cy" from="${height-30}" to="40" dur="6.2s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="cx" values="750; 753; 748; 752; 750" dur="3s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="opacity" from="0.5" to="0" dur="6.2s" repeatCount="indefinite" begin="0.8s" />
        </circle>
      </g>
    `;
  }

  const frameHighlightColor = adjustColor(frameColor, 35);
  const borderRadius = 16;
  
  const glassFrame = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${frameColor}" stroke-width="8" rx="${borderRadius}" ry="${borderRadius}" />
    <rect x="4" y="4" width="${width-8}" height="${height-8}" fill="none" stroke="${frameHighlightColor}" stroke-width="2" opacity="0.4" rx="${borderRadius-3}" ry="${borderRadius-3}" />
    <rect x="0" y="0" width="${width}" height="18" fill="url(#reflectionGrad)" />
  `;

  const legendCardHeight = Math.max(50, legendItems.length * 30 + 26);

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="roundedCorners">
          <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" ry="${borderRadius}" />
        </clipPath>
      </defs>
      <g clip-path="url(#roundedCorners)">
        ${background}
        ${decorations}

        ${fishElements.join('\n')}

        ${showLegend && legendItems.length > 0 ? `
          <g transform="translate(${width - 215}, 12)"> 
            <rect x="0" y="0" width="202" height="${legendCardHeight}" rx="12" fill="rgba(12, 20, 34, 0.76)" />
            
            <text x="14" y="19" font-size="9" font-weight="700" fill="rgba(255, 255, 255, 0.55)" font-family="system-ui, -apple-system, sans-serif" letter-spacing="1.2">LANGUAGES</text>
            
            ${legendItems.join('\n')}
          </g>
        ` : ''}

        ${showFrame ? glassFrame : ''}
      </g>
    </svg>
  `;

  return svg;
}

module.exports = { generateAquariumSVG, buildFishRoute };
