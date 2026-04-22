const { getLanguageColor, getFishShape, resolveShapeForLanguage } = require('./fish-shapes');

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

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function formatLanguageName(language) {
  const words = language.split(' ');
  if (words.length === 1) {
    return language;
  }
  return `${words[0]} ${words[1].charAt(0)}.`;
}

function generateFishPath(index, width, height, swimBounds, rand, startFromRight = false) {
  const { minY, maxY } = swimBounds;

  const baseY = clamp(
    minY + ((index * 0.618 + 0.1) % 1.0) * (maxY - minY),
    minY, maxY
  );

  const maxAmp = 75;
  const amp = 20 + rand(index * 7) * maxAmp;

  const r = (seed) => (rand(seed) - 0.5) * 2;

  const yA = clamp(baseY + r(index * 3  + 10) * amp, minY, maxY);
  const yB = clamp(baseY + r(index * 5  + 20) * amp, minY, maxY);
  const yC = clamp(baseY + r(index * 9  + 30) * amp, minY, maxY);
  const yStart = clamp(baseY + r(index * 31 + 5) * amp * 0.5, minY, maxY);

  const yD = clamp(baseY + r(index * 13 + 40) * amp, minY, maxY);
  const yE = clamp(baseY + r(index * 17 + 50) * amp, minY, maxY);
  const yF = clamp(baseY + r(index * 19 + 60) * amp, minY, maxY);

  const xS  = 120;
  const xA  = Math.round(width * 0.25);
  const xB  = Math.round(width * 0.5);
  const xC  = Math.round(width * 0.75);
  const xE2 = Math.round(width - 120);

  const segX = xA - xS;
  const maxCpOff = segX * 0.36;

  const epsilon = 0.01;

  const points = [
    { x: xS,  y: yStart },
    { x: xA,  y: yA },
    { x: xB,  y: yB },
    { x: xC,  y: yC },
    { x: xE2, y: yC  },
    { x: xC,  y: yD },
    { x: xB,  y: yE },
    { x: xA,  y: yF },
    { x: xS - epsilon,  y: yStart },
  ];

  if (startFromRight) {
    points.forEach(p => { p.x = width - p.x; });
  }

  const path = buildPath(
    points[0], points[1], points[2], points[3], points[4],
    points[5], points[6], points[7], points[8],
    maxCpOff, index, rand
  );

  const n = 12;
  const keyTimes   = Array.from({ length: n + 1 }, (_, i) => (i / n).toFixed(4)).join(';');
  const keySplines = Array(n).fill('0.2 0.1 0.8 0.9').join(';');

  return { d: path, keyTimes, keySplines };
}

function buildPath(p0, p1, p2, p3, p4, p5, p6, p7, p8, maxCpOff, index, rand) {
  const r = (seed) => (rand(seed) - 0.5) * 2;

  const cp = (from, to, t, seed) => {
    const x = from.x + (to.x - from.x) * t;
    const yBase = from.y + (to.y - from.y) * t;
    const off = r(seed) * maxCpOff * 0.5;
    return { x, y: yBase + off };
  };

  const segments = [
    [p0, p1],
    [p1, p2],
    [p2, p3],
    [p3, p4],
    [p4, p5],
    [p5, p6],
    [p6, p7],
    [p7, p8],
  ];

  let d = `M ${p0.x},${p0.y}`;
  segments.forEach(([from, to], i) => {
    const c1 = cp(from, to, 0.33, index * 100 + i * 7 + 1);
    const c2 = cp(from, to, 0.67, index * 100 + i * 7 + 2);
    d += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${to.x},${to.y}`;
  });

  return d;
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

    const swimDuration = 40 + seededRandom(index * 41) * 20;
    const wiggleDuration = 1.5 + seededRandom(index * 53) * 1;

    const baseDelay = 3;
    const fadeDelay = index * baseDelay + seededRandom(index * 13) * 3;

    const startFromRight = index % 2 === 1;

    const path = generateFishPath(index, width, height, swimBounds, seededRandom, startFromRight);

    const sx  = startFromRight ? -scale :  scale;
    const sxf = startFromRight ?  scale : -scale;
    const sy  = scale;

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
        keyTimes="${path.keyTimes}"
        keySplines="${path.keySplines}"
        path="${path.d}"
      />

      <g>
        <animateTransform
          attributeName="transform"
          type="scale"
          values="${sx} ${sy}; ${sx} ${sy}; ${sxf} ${sy}; ${sxf} ${sy}; ${sx} ${sy}"
          keyTimes="0;0.5;0.5;1;1"
          calcMode="discrete"
          dur="${swimDuration}s"
          repeatCount="indefinite"
          begin="${fadeDelay}s"
        />

        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;2;0;-2;0"
            dur="${wiggleDuration}s"
            repeatCount="indefinite"
            begin="${fadeDelay}s"
          />
          ${getFishShape(shapeName, color)}
        </g>
      </g>

      ${showLanguageLabels ? `
      <text
        x="0"
        y="36"
        font-size="18"
        fill="#fff"
        font-family="monospace"
        text-anchor="middle"
        opacity="0.9"
      >
        ${language}
      </text>
      ` : ''}
    </g>
  `;

    fishElements.push(fishSVG);

    if (showLegend) {
      legendItems.push(`
      <g transform="translate(5, ${20 + index * 28})">
        <circle cx="12" cy="10" r="10" fill="${color}" stroke="#000" stroke-width="0.5" />
        <text x="30" y="16" font-size="15" fill="#ffffff" font-family="monospace">${displayName}: ${percentage.toFixed(1)}%</text>
      </g>
    `);
    }
  });

  const background = bgGradient
    ? `
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${adjustColor(bgColor, -15)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(bgColor, -35)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${sandColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(sandColor, -40)};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.15" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
    `
    : `<rect width="100%" height="100%" fill="${bgColor}" />`;

  let decorations = '';

  const sandShadowColor = adjustColor(sandColor, -20);
  decorations += `
    <path d="M0,${height-25} Q80,${height-35} 160,${height-28} Q240,${height-38} 320,${height-25} Q400,${height-32} 480,${height-28} Q560,${height-35} 640,${height-25} Q720,${height-30} 800,${height-28} L800,${height} L0,${height} Z" fill="url(#sandGrad)" />
    <ellipse cx="100" cy="${height-20}" rx="30" ry="5" fill="${sandShadowColor}" opacity="0.4" />
    <ellipse cx="500" cy="${height-22}" rx="45" ry="6" fill="${sandShadowColor}" opacity="0.3" />
    <ellipse cx="700" cy="${height-18}" rx="25" ry="4" fill="${sandShadowColor}" opacity="0.4" />
  `;

  if (showRocks) {
    decorations += `
      <g transform="translate(50, ${height-50})">
        <ellipse cx="2.486" cy="31.955" rx="32.21" ry="5.856" fill="#000" opacity=".15" style="stroke-width:1"/>
        <path d="M11.704 19.897c-2.229 3.497-.993 7.744 1.896 10.631q4.329 4.332 10.827 2.166 6.495-2.166 5.413-8.662-1.083-6.496-7.579-7.579c-4.33-.722-7.891.214-10.557 3.444" style="stroke-width:1;fill:#818388;transform-box:fill-box;transform-origin:50% 50%"/>
        <path d="M14.725 23.78c-1.951.305 0 5.053 2.165 6.497 2.165.721 5.133-.869 3.992-3.418-1.443-2.165-3.271-3.079-6.157-3.079" opacity=".6" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%"/>
        <circle cx="27.351" cy="-23.359" r=".866" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(1 0 0 -1 0 46.718)"/>
        <circle cx="25.325" cy="-30.117" r=".649" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(1 0 0 -1 0 60.234)"/>
        <path d="M-28.296 25.559c-6.029-9.456-2.686-20.943 5.127-28.751q11.71-11.713 29.279-5.856 17.57 5.856 14.641 23.425Q17.823 31.947.254 34.874c-11.711 1.952-21.341-.578-28.55-9.315" style="stroke-width:1; fill: rgb(186, 189, 197);"/>
        <path d="M-5.386 33.456c-5.276-.824 0-13.665 5.854-17.569 5.856-1.952 13.882 2.35 10.796 9.243-3.903 5.856-8.844 8.326-16.65 8.326" fill="#6f7682" opacity=".6" style="stroke-width:1;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(14.809)"/>
        <circle cx="-19.537" cy="25.989" r="2.343" fill="#6f7682" style="stroke-width:1"/>
        <circle cx="7.14" cy="-2.078" r="1.757" fill="#6f7682" style="stroke-width:1"/>
      </g>
      <g transform="translate(350, ${height-45})">
        <ellipse cx="1.842" cy="31.311" rx="32.21" ry="5.856" fill="#000" opacity=".15" style="stroke-width:1"/>
        <path d="M11.283 19.919c-2.229 3.497-.993 7.744 1.896 10.631q4.329 4.332 10.827 2.166 6.496-2.166 5.413-8.662t-7.579-7.579c-4.33-.722-7.891.214-10.557 3.444" style="stroke-width:1;fill: rgb(186, 189, 197);;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
        <path d="M19.801 19.211c-1.951.305 0 5.053 2.165 6.497 2.165.721 5.133-.869 3.992-3.418-1.443-2.165-3.271-3.079-6.157-3.079" opacity=".6" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%" transform="scale(-1)"/>
        <circle cx="-12.782" cy="26.302" r=".866" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(-1 0 0 1 25.564 0)"/>
        <circle cx="-14.808" cy="19.544" r=".649" style="stroke-width:1;fill:#5c626c;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(-1 0 0 1 29.616 0)"/>
        <path d="M-33.093 26.916c-3.814-5.982-1.699-13.248 3.243-18.187q7.407-7.41 18.521-3.704Q-.215 8.729-2.068 19.842-3.92 30.957-15.034 32.808c-7.408 1.235-13.499-.365-18.059-5.892" style="stroke-width:1;fill: rgb(186, 189, 197);transform-box:fill-box;transform-origin:50% 50%" transform="rotate(235.112)"/>
        <path d="M-21.183 28.582c-2.181-2.236 2.021-7.208 5.152-7.269 2.845.97 5.71 5.98 3.344 8.562-2.569 1.756-5.09 1.372-8.496-1.293" fill="#6f7682" opacity=".6" style="stroke-width:1;transform-origin:-16.542px 26.412px" transform="rotate(-15)"/>
        <circle cx="-9.288" cy="23.567" r="1.009" fill="#6f7682" style="stroke-width:1"/>
        <circle cx="-26.849" cy="11.061" r="1.757" fill="#6f7682" style="stroke-width:1"/>
        <path d="M-1.952 26.79c-3.334.447 0 7.41 3.7 9.528 3.699 1.057 8.771-1.275 6.821-5.013C6.104 28.13 2.98 26.79-1.952 26.79" style="stroke-width:1;fill:#8b8f99;transform-origin:2.838px 31.682px" transform="rotate(142.4)"/>
        <circle cx="3.839" cy="31.682" r="1.757" fill="#6f7682" style="stroke-width:1"/>
      </g>
      <g transform="translate(650, ${height-55})">
        <ellipse cx="15.964" cy="39.858" rx="37.799" ry="6.872" fill="#000" opacity=".15" style="stroke-width:1"/>
        <path d="M44.219 32.965c6.398-7.225-29.5-12.5-47.008-8.891-13.282 5.397-16.438 19.175 3.227 21.697 18.685.571 31.683-3.234 43.781-12.806" style="stroke-width:1;fill:#8b8f99;transform-origin:12.994px 34.01px" transform="rotate(8.894)"/>
        <circle cx="-9.761" cy="29.163" r="1.757" fill="#6f7682" style="stroke-width:1" transform="matrix(1.52279 0 0 1.45003 14.18 -3.783)"/>
        <path d="M-12.27 28.116c-12.254-4.102 1.607-12.187 15.773-11.936 13.933 1.998 32.215 10.952 24.185 15.13-9.824 2.733-21.686 1.785-39.958-3.194" style="stroke-width:1;fill:#a1a5b0;transform-origin:6.537px 24.904px" transform="rotate(-9.819)"/>
        <circle cx="-34.917" cy="31.551" r=".988" style="stroke-width:1;fill:#6f7682;transform-box:fill-box;transform-origin:50% 50%" transform="matrix(-1 0 0 1 69.834 0)"/>
        <path d="M1.692 22.948c-8.121-2.398-.267-11.88 8.65-13.411 8.953.175 21.366 6.471 16.765 11.479-5.879 3.846-13.425 4.421-25.415 1.932" style="stroke-width:1;fill:#babdc5;transform-origin:13.161px 17.52px"/>
        <path d="M-14.304 19.306c-1.309 2.052-.583 4.542 1.111 6.236q2.54 2.54 6.351 1.27 3.809-1.27 3.176-5.082-.638-3.809-4.447-4.444c-2.54-.424-4.628.126-6.191 2.02" style="stroke-width:1;fill:#babdc5;transform-origin:-9.277px 22.193px" transform="scale(-1)"/>
        <path d="M-12.534 21.583c-1.144.178 0 2.964 1.27 3.81 1.271.423 3.011-.508 2.343-2.004-.847-1.27-1.919-1.806-3.613-1.806" opacity=".6" style="stroke-width:1;fill:#909298;transform-origin:-9.277px 22.193px" transform="scale(-1)"/>
        <circle cx="13.424" cy="23.05" r=".509" style="stroke-width:1;fill:#909298;transform-origin:9.276px 22.193px" transform="matrix(-1 0 0 1 -18.553 0)"/>
      </g>
    `;
  }

  if (showPlants) {
    decorations += `
      <g transform="translate(80, ${height-60})" opacity="0.85">
        <path d="M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70" stroke="#1d6b3a" stroke-width="6" fill="none">
          <animate attributeName="d" dur="4s" repeatCount="indefinite" values="M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70;M0,60 Q-8,40 -5,20 Q12,0 2,-25 Q-8,-45 5,-70;M0,60 Q-12,40 5,20 Q18,0 8,-25 Q-2,-45 10,-70" />
        </path>
        <path d="M5,60 Q20,35 10,15 Q0,-5 15,-30" stroke="#2d8a4a" stroke-width="4" fill="none">
          <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M5,60 Q20,35 10,15 Q0,-5 15,-30;M5,60 Q15,35 5,15 Q-5,-5 10,-30;M5,60 Q20,35 10,15 Q0,-5 15,-30" />
        </path>
      </g>
      <g transform="translate(280, ${height-40})" opacity="0.8">
        <path d="M0,40 Q-8,25 0,10 Q8,-5 0,-20" stroke="#1d6b3a" stroke-width="4" fill="none">
          <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M0,40 Q-8,25 0,10 Q8,-5 0,-20;M0,40 Q-5,25 3,10 Q11,-5 3,-20;M0,40 Q-8,25 0,10 Q8,-5 0,-20" />
        </path>
        <path d="M8,40 Q15,28 8,15 Q0,0 10,-15" stroke="#2d8a4a" stroke-width="3" fill="none">
          <animate attributeName="d" dur="3.2s" repeatCount="indefinite" values="M8,40 Q15,28 8,15 Q0,0 10,-15;M8,40 Q12,28 5,15 Q-3,0 7,-15;M8,40 Q15,28 8,15 Q0,0 10,-15" />
        </path>
      </g>
      <g transform="translate(720, ${height-65})" opacity="0.85">
        <path d="M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65" stroke="#1d6b3a" stroke-width="6" fill="none">
          <animate attributeName="d" dur="4.5s" repeatCount="indefinite" values="M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65;M0,65 Q-10,45 2,25 Q14,5 -2,-20 Q-15,-40 3,-65;M0,65 Q-15,45 8,25 Q20,5 5,-20 Q-10,-40 8,-65" />
        </path>
        <path d="M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60" stroke="#2d8a4a" stroke-width="4" fill="none">
          <animate attributeName="d" dur="3.8s" repeatCount="indefinite" values="M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60;M-8,65 Q0,40 -10,20 Q-20,0 -5,-25 Q5,-45 -10,-60;M-8,65 Q5,40 -5,20 Q-15,0 0,-25 Q10,-45 -5,-60" />
        </path>
      </g>
      <g transform="translate(550, ${height-50})">
        <ellipse cx="-16.963" cy="25.707" rx="23.369" ry="4.291" fill="#000" opacity=".15" style="stroke-width:1;transform-origin:-19.959px 4.651px"/>
        <path d="M-20.475 24.293q-5.895-11.788 0-23.576c-7.859 3.929-16.174-3.564-18.139-11.422 3.93-3.93 12.243 1.598 18.139 5.528-1.966-11.788 5.386-20.933 11.28-22.898 5.304 6.46 2.374 12.744.507 22.898 5.895-3.93 8.113-6.056 12.043-2.126C1.389.556-.829 4.646-8.688.717q5.895 11.788 0 23.576z" fill="#ff7a7a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
        <path d="M-17.322 24.247q-2.947-11.787 2.947-17.681-2.947-11.788 2.947-14.737 2.947 8.843-2.947 32.418z" fill="#ff5252" opacity=".6" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
        <path d="M-38.103 25.608q-3.135-6.273 0-12.545c-4.182 2.091-8.148 1.945-9.192-2.237 2.093-2.091 6.055-2.99 9.192-.901-1.046-6.272-1.351-7.829 1.785-8.875 3.136 1.046 5.534 2.603 4.488 8.875 3.136-2.089 5.75-3.891 7.842-1.8-1.046 4.182-3.66 7.029-7.842 4.938q3.137 6.272 0 12.545z" style="stroke-width:1;fill:#fe5d72;transform-origin:-19.393px 1.143px"/>
        <path d="M-.141 26.989q-1.743-3.489 0-6.978-3.49 1.743-4.361-1.744 1.744-1.747 4.361 0c-.582-3.489 1.331-5.691 3.075-6.274 1.744.583.996 2.785.413 6.274q2.618-1.747 4.362 0-.872 3.487-4.362 1.744 1.746 3.489 0 6.978z" style="stroke-width:1;fill:#fe5d72;transform-origin:-19.393px 1.143px"/>
      </g>
    `;
  } else if (showPlantsAlt) {
    decorations += `
      <g transform="translate(80, ${height-60})" opacity="0.9">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-6,2;0,0;6,-2;0,0" dur="10s" repeatCount="indefinite"></animateTransform>
          <path d="M0,60 Q-18,35 -8,5 Q2,-25 -12,-60" stroke="#8b0000" stroke-width="3" fill="none"></path>
          <ellipse cx="-10" cy="-30" rx="10" ry="4" fill="#b22222" opacity="0.8" transform="matrix(0.766044, -0.642788, 0.642788, 0.766044, 15.33034, -13.216007)"></ellipse>
          <ellipse cx="-12" cy="-55" rx="10" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.866025, -0.5, 0.5, 0.866025, 19.569353, -13.055357)"></ellipse>
          <ellipse cx="-6" cy="5" rx="9" ry="3.5" fill="#cc2222" opacity="0.75" transform="matrix(0.573576, -0.819152, 0.819152, 0.573576, -11.956587, 0.444675)"></ellipse>
          <ellipse cx="-2" cy="25" rx="7" ry="2.5" fill="#cc2222" opacity="0.6" transform="matrix(0.34202, -0.939693, 0.939693, 0.34202, -36.56551, 22.408265)"></ellipse>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;4,1;0,0;-4,-1;0,0" dur="9.7s" repeatCount="indefinite"></animateTransform>
          <path d="M0,60 Q8,32 2,0 Q-6,-30 8,-65" stroke="#a81010" stroke-width="3" fill="none"></path>
          <ellipse cx="5" cy="-35" rx="11" ry="4" fill="#cc2222" opacity="0.8" transform="matrix(0.866025, 0.5, -0.5, 0.866025, -13.602658, -5.575372)"></ellipse>
          <ellipse cx="8" cy="-58" rx="11" ry="4" fill="#cc2222" opacity="0.8" transform="matrix(0.906308, 0.422618, -0.422618, 0.906308, -16.38523, -10.625938)"></ellipse>
          <ellipse cx="10" cy="10" rx="8" ry="3" fill="#b22222" opacity="0.7" transform="matrix(0.5, 0.866025, -0.866025, 0.5, 10.432786, -1.124387)"></ellipse>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-4,-1;0,0;4,1;0,0" dur="9.3s" repeatCount="indefinite"></animateTransform>
          <path d="M0,60 Q22,40 18,15 Q14,-10 28,-40" stroke="#c41e1e" stroke-width="3" fill="none"></path>
          <ellipse cx="20" cy="-15" rx="10" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.573576, 0.819152, -0.819152, 0.573576, 7.767896, -40.069443)"></ellipse>
          <ellipse cx="20" cy="-15" rx="8.05" ry="2.818" fill="#b22222" opacity="0.8" transform="matrix(0.573576, 0.819152, -0.819152, 0.573576, -0.916156, -16.98872)" style="stroke-width: 1;"></ellipse>
        </g>
      </g>

      <g transform="translate(280, ${height-40})" opacity="0.85">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-4,1;0,0;4,-1;0,0" dur="9s" repeatCount="indefinite"></animateTransform>
          <path d="M0,40 Q-14,20 -6,0 Q2,-18 -10,-38" stroke="#991111" stroke-width="3" fill="none"></path>
          <ellipse cx="-8" cy="-18" rx="9" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.766044, -0.642788, 0.642788, 0.766044, 8.412462, -7.900607)"></ellipse>
          <ellipse cx="-10" cy="-32" rx="9" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.819152, -0.573576, 0.573576, 0.819152, 11.544216, -12.249345)"></ellipse>
          <ellipse cx="-5" cy="5" rx="8" ry="3" fill="#b22222" opacity="0.75" transform="matrix(0.642788, -0.766044, 0.766044, 0.642788, -12.350708, 2.677772)"></ellipse>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;3,1;0,0;-3,-1;0,0" dur="9.2s" repeatCount="indefinite"></animateTransform>
          <path d="M0,40 Q12,22 8,4 Q4,-14 16,-34" stroke="#bb1a1a" stroke-width="3" fill="none"></path>
          <ellipse cx="10" cy="-16" rx="9" ry="3.5" fill="#cc2222" opacity="0.8" transform="matrix(0.766044, 0.642788, -0.642788, 0.766044, -3.949552, -6.175687)"></ellipse>
          <ellipse cx="14" cy="-28" rx="8" ry="3" fill="#cc2222" opacity="0.8" transform="matrix(0.707107, 0.707107, -0.707107, 0.707107, -10.102289, -18.660119)"></ellipse>
          <ellipse cx="8" cy="8" rx="7" ry="2.5" fill="#cc2222" opacity="0.7" transform="matrix(0.573576, 0.819152, -0.819152, 0.573576, 13.881942, 2.17457)"></ellipse>
        </g>
      </g>

      <g transform="translate(720, ${height-65})" opacity="0.9">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-5,2;0,0;5,-2;0,0" dur="8.5s" repeatCount="indefinite"></animateTransform>
          <path d="M0,65 Q-20,40 -10,10 Q0,-20 -15,-60" stroke="#8b0000" stroke-width="3" fill="none"></path>
          <ellipse cx="-12" cy="-30" rx="11" ry="4" fill="#b22222" opacity="0.8" transform="matrix(0.766044, -0.642788, 0.642788, 0.766044, 13.678066, -14.452306)"></ellipse>
          <ellipse cx="-15" cy="-55" rx="10" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.819152, -0.573576, 0.573576, 0.819152, 22.398344, -17.710858)"></ellipse>
          <ellipse cx="-8" cy="5" rx="9" ry="3" fill="#cc2222" opacity="0.75" transform="matrix(0.642788, -0.766044, 0.766044, 0.642788, -12.284116, 0.974107)"></ellipse>
          <ellipse cx="-2" cy="25" rx="7" ry="2.5" fill="#cc2222" opacity="0.6" transform="matrix(0.422618, -0.906308, 0.906308, 0.422618, -37.243349, 26.612441)"></ellipse>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;4,1;0,0;-4,-1;0,0" dur="8s" repeatCount="indefinite"></animateTransform>
          <path d="M0,65 Q10,38 4,5 Q-2,-28 12,-62" stroke="#a81010" stroke-width="3" fill="none"></path>
          <ellipse cx="8" cy="-32" rx="12" ry="4" fill="#cc2222" opacity="0.8" transform="matrix(0.866025, 0.5, -0.5, 0.866025, -10.731051, -6.608328)"></ellipse>
          <ellipse cx="10" cy="-57" rx="11" ry="4" fill="#cc2222" opacity="0.8" transform="matrix(0.866025, 0.5, -0.5, 0.866025, -18.206313, -12.07693)"></ellipse>
          <ellipse cx="12" cy="8" rx="8" ry="3" fill="#b22222" opacity="0.7" transform="matrix(0.5, 0.866025, -0.866025, 0.5, 8.731052, -2.195153)"></ellipse>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-3,-1;0,0;3,1;0,0" dur="7.8s" repeatCount="indefinite"></animateTransform>
          <path d="M0,65 Q25,42 20,15 Q15,-12 30,-45" stroke="#c41e1e" stroke-width="3" fill="none"></path>
          <ellipse cx="22" cy="-12" rx="10" ry="3.5" fill="#b22222" opacity="0.8" transform="matrix(0.573576, 0.819152, -0.819152, 0.573576, 1.510176, -14.184499)"></ellipse>
          <ellipse cx="28" cy="-32" rx="9" ry="3" fill="#cc2222" opacity="0.8" transform="matrix(0.766044, 0.642788, -0.642788, 0.766044, -7.303014, -32.479885)"></ellipse>
        </g>
      </g>

      <g transform="translate(550, ${height-42})">
        <ellipse cx="-25.372" cy="20.463" rx="17.638" ry="3.207" fill="#000" opacity=".12" style="stroke-width: 1;"></ellipse>
        <line x1="-20.372" y1="19.653" x2="-20.372" y2="4.653" stroke="#2d6a1a" stroke-width="2.5" style="stroke-width: 2.5;"></line>
        <line x1="-20.372" y1="13.653" x2="-32.372" y2="3.653" stroke="#2d6a1a" stroke-width="2" style="stroke-width: 2;"></line>
        <line x1="-20.372" y1="13.653" x2="-8.372" y2="3.653" stroke="#2d6a1a" stroke-width="2" style="stroke-width: 2;"></line>
        <line x1="-20.372" y1="9.653" x2="-27.372" y2="-2.347" stroke="#2d6a1a" stroke-width="1.8" style="stroke-width: 1.8;"></line>
        <line x1="-20.372" y1="9.653" x2="-12.372" y2="-2.347" stroke="#2d6a1a" stroke-width="1.8" style="stroke-width: 1.8;"></line>
        <line x1="-32.372" y1="3.653" x2="-38.372" y2="-4.347" stroke="#2d6a1a" stroke-width="1.5" style="stroke-width: 1.5;"></line>
        <line x1="-32.372" y1="3.653" x2="-27.372" y2="-5.347" stroke="#2d6a1a" stroke-width="1.5" style="stroke-width: 1.5;"></line>
        <line x1="-8.372" y1="3.653" x2="-2.372" y2="-4.347" stroke="#2d6a1a" stroke-width="1.5" style="stroke-width: 1.5;"></line>
        <line x1="-8.372" y1="3.653" x2="-13.372" y2="-5.347" stroke="#2d6a1a" stroke-width="1.5" style="stroke-width: 1.5;"></line>
        <ellipse cx="-20.372" cy="2.653" rx="7" ry="5" fill="#3a8c22" opacity="0.9" style="stroke-width: 1;">
          <animate attributeName="rx" values="7;8;7" dur="3s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-33.372" cy="0.653" rx="6" ry="4.5" fill="#4aa030" opacity="0.9" style="stroke-width: 1;">
          <animate attributeName="rx" values="6;7;6" dur="3.3s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-7.372" cy="0.653" rx="6" ry="4.5" fill="#3a8c22" opacity="0.9" style="stroke-width: 1;">
          <animate attributeName="rx" values="6;7;6" dur="2.8s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-39.372" cy="-6.347" rx="5" ry="4" fill="#4aa030" opacity="0.85" style="stroke-width: 1;">
          <animate attributeName="rx" values="5;6;5" dur="3.5s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-1.372" cy="-6.347" rx="5" ry="4" fill="#3a8c22" opacity="0.85" style="stroke-width: 1;">
          <animate attributeName="rx" values="5;6;5" dur="3.1s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-27.372" cy="-5.347" rx="5.5" ry="4" fill="#55b535" opacity="0.85" style="stroke-width: 1;">
          <animate attributeName="rx" values="5.5;6.5;5.5" dur="2.9s" repeatCount="indefinite"></animate>
        </ellipse>
        <ellipse cx="-12.372" cy="-5.347" rx="5.5" ry="4" fill="#4aa030" opacity="0.85" style="stroke-width: 1;">
          <animate attributeName="rx" values="5.5;6.5;5.5" dur="3.4s" repeatCount="indefinite"></animate>
        </ellipse>
      </g>
    `;
  }

  if (showCastle) {
    decorations += `
      <g transform="translate(180, ${height-95})">
        <ellipse cx="2.117" cy="75.248" rx="54.257" ry="20.871" fill="#000" opacity=".15" style="stroke-width:1"/>
        <rect x="-39.465" y="27.245" width="87.32" height="47.584" rx="18" fill="#4a5568" style="stroke-width:1"/>
        <rect x="-36.355" y="25.305" width="81.573" height="14.176" rx="12" style="stroke-width:1;fill:#5e6d7b"/>
        <rect x="-49.955" y="13.649" width="27.191" height="63.377" rx="8.78" fill="#6b7c8c" style="stroke-width:1" ry="8.78"/>
        <rect x="-47.515" y="14.883" width="22.323" height="10.045" rx="12" style="stroke-width:1;fill:#4e5c69"/>
        <rect x="31.621" y="13.649" width="27.191" height="63.705" rx="7.99" fill="#6b7c8c" style="stroke-width:1" ry="7.99"/>
        <rect x="33.587" y="14.986" width="23.257" height="10.465" rx="12" style="stroke-width:1;fill:#4e5c69"/>
        <rect x="48.262" y="-18.315" width="33.988" height="54.381" fill="#6b7c8c" transform="matrix(1 0 .01556 1 -60.965 -.075)" ry="10.364" rx="10.364" style="stroke-width:1"/>
        <rect x="-10.005" y="-16.829" width="28.385" height="11.355" rx="18" style="stroke-width:1;fill:#4e5c69"/>
        <rect x="-1.081" y="1.824" width="11.739" height="11.52" fill="#2b1a12" style="stroke-width:1" rx="6" ry="6"/>
        <rect x="-6.375" y="47.774" width="21.605" height="25.206" rx="14" fill="#2b1a12" style="stroke-width:1"/>
        <rect x="-37.525" y="-2.059" width="2.719" height="20.033" fill="#444" style="stroke-width:1" rx=".425" ry=".425"/>
        <path fill="#5ad1ff" style="stroke-width:1" d="m-34.795-2.022 9.35 4.676-9.35 4.675z"/>
        <rect x="-37.935" y="33.309" width="11.739" height="11.52" fill="#2b1a12" style="stroke-width:1" rx="6" ry="6"/>
        <rect x="35.538" y="44.631" width="11.739" height="11.52" fill="#2b1a12" style="stroke-width:1" rx="6" ry="6"/>
        <rect x="43.791" y="-1.999" width="2.719" height="20.178" fill="#444" style="stroke-width:1" rx=".425" ry=".425"/>
        <path fill="#5ad1ff" style="stroke-width:1" d="m46.519-1.962 9.351 4.676-9.351 4.675z"/>
      </g>
    `;
  } else if (showShip) {
    decorations += `
      <g transform="translate(180, ${height-95})">
        <ellipse cx="10.01" cy="78.166" rx="61.817" ry="17.982" fill="#000" opacity=".15" style="stroke-width:1"/>
        <g transform="rotate(-12 17.055 28.746)scale(1.0542)">
          <path d="M-57.343 49.166 56.04 53.707l-2.063-13.55L15.69 28.15l-28.831 14.291-27.85-5.49z" fill="#b08b71"/>
          <path d="M-71.115 61.511C-57.781 44.844-38.333 32.667-25 38q20 7 35-8c13.333-3.333 28.803 1.809 45.47 11.809" stroke="#8a6748" stroke-width="7" stroke-linecap="round" fill="#b08b71"/>
          <rect x="-2" width="6" height="15.063" rx="3" fill="#5a422d" transform="rotate(-9.141 179.021 264.928)" style="stroke-width:1;transform-origin:1px 7.531px"/>
          <rect x="-2" width="6" height="35.786" rx="3" fill="#5a422d" transform="rotate(-9.141 116.992 23.243)" style="stroke-width:1;transform-origin:1px 17.893px"/>
          <path d="M-69.65 57.198C-53.703 46.291-39.037 41.667-18.481 45l30.835 5q20.556 5 46.253-10l5.139 20Q27.772 75-13.342 72c-20.556-1.333-39.345-2.248-59.602-6.99-5.189-4.269 1.415-6.04 3.294-7.812" fill="#6b4a32"/>
          <path d="M-52.054 56.811q6.448-6.448 16.12-1.29l-1.289 9.028q-8.383-1.29-12.897 1.935z" fill="#2b1a12" style="transform-box:fill-box;transform-origin:50% 50%" transform="rotate(20.26)"/>
          <ellipse cx="-7.907" cy="-52.363" rx="2.748" ry="2.377" fill="#2b1a12" transform="scale(1 -1)"/>
          <ellipse cx="41.616" cy="56.406" rx="8" ry="6" fill="#2b1a12"/>
        </g>
        <g transform="rotate(-12 17.055 28.746)scale(1.0542)">
          <rect x="-2" width="6" height="12" rx="3" fill="#5a422d" transform="rotate(-9.141 14.676 44.497)" style="transform-box:fill-box;transform-origin:50% 50%"/>
          <path d="M-15 25h25L5 10l-25 5Z" fill="#8a6748"/>
        </g>
      </g>
    `;
  }

  if (showChest) {
    decorations += `
      <g transform="translate(420, ${height-55})">
        <ellipse cx="20.239" cy="37.425" rx="26.053" ry="5.208" fill="#000" opacity=".15" style="stroke-width:1"/>
        <rect x="15.886" y="-8.964" width="10.642" height="7.688" rx="20" fill="#ffc933" style="stroke-width:1"/>
        <rect x="-3.954" y="-5.544" width="51.495" height="21.284" fill="#a65f2b" style="stroke-width:1" ry="5.177" rx="5.177"/>
        <rect x="-1.937" y="-3.42" width="47.204" height="18.519" fill="#8a4f25" style="stroke-width:1" rx="3.402" ry="3.402"/>
        <path style="stroke-width:1;fill:#3bb8f2" d="m23.592 11.548 6.437-6.436 6.437 6.436-6.437 6.437z"/>
        <path style="stroke-width:1;fill:#3bb8f2;transform-origin:21.595px 13.465px" d="m17.395 9.76 1.453 8.736 6.948-1.452-1.453-8.609z" transform="scale(-1)"/>
        <path style="stroke-width:1;fill:#92cf30;transform-origin:27.857px 11.804px" d="m23.656 15.51 1.454-8.736 6.947 1.452-1.452 8.609z" transform="rotate(90)"/>
        <path style="stroke-width:1;fill:#3bb8f2;transform-origin:38.974px 12.059px" d="m34.773 8.354 1.454 8.736 6.948-1.452-1.453-8.609z" transform="rotate(-90)"/>
        <path style="stroke-width:1;fill:#3bb8f2" d="m5.32 12.698 6.436-6.436 6.438 6.436-6.438 6.437z"/>
        <path fill="#5ad1ff" style="stroke-width:1" d="m14.817 11.666 6.437-6.437 6.437 6.437-6.437 6.436zm-16.511-.467 6.436-6.437 6.438 6.437-6.438 6.437z"/>
        <path style="stroke-width:1;fill:#acf23b" d="m11.07 12.442 6.437-6.436 6.437 6.436-6.437 6.437z"/>
        <path style="stroke-width:1;fill:#acf23b;transform-origin:4.218px 13.977px" d="m.018 17.682 1.453-8.736 6.948 1.452-1.453 8.609z" transform="rotate(90)"/>
        <path style="stroke-width:1;fill:#acf23b;transform-origin:34.3875px 12.2845px" transform="rotate(90)" d="m27.951 12.284 6.437-6.436 6.436 6.436-6.436 6.437z"/>
        <rect x="-4.591" y="13.488" width="51.495" height="21.284" fill="#a65f2b" style="stroke-width:1" ry="5.177" rx="5.177"/>
        <rect x="-4.591" y="11.561" width="5.688" height="25.747" rx="4.964" fill="#ffb800" style="stroke-width:1" ry="4.964"/>
        <rect x="14.718" y="11.17" width="12.873" height="12.016" rx="8" fill="#ffc933" style="stroke-width:1"/>
        <circle cx="21.156" cy="16.749" r="2.146" fill="#7a4a00" style="stroke-width:1"/>
        <path fill="#7a4a00" style="stroke-width:1" d="M19.868 16.749h2.574v3.433h-2.574z"/>
        <rect x="-4.49" y="31.899" width="52.513" height="5.571" rx="4.954" fill="#ffb800" style="stroke-width:1" ry="4.954"/>
        <rect x="42.238" y="11.588" width="5.892" height="25.747" rx="4.964" fill="#ffb800" style="stroke-width:1" ry="4.964"/>
      </g>
    `;
  } else if (showAnubias) {
  decorations += `
    <g transform="translate(420, ${height-55})">
      <ellipse cx="19.559" cy="33.119" rx="30.77" ry="8.951" fill="#000" opacity=".15" style="stroke-width:1"/>
      <g transform="rotate(-12 -262.508 310.172)scale(.42693)">
        <rect x="461.538" y="279.895" width="50.728" height="145.822" transform="rotate(-72.058 -254.114 142.42)" rx="25.364" ry="25.364" style="transform-box:fill-box;transform-origin:50% 50%" fill="#5a422d"/>
        <circle cx="220.039" cy="224.351" style="fill:#b28760;transform-box:fill-box;transform-origin:50% 50%" r="23.685"/>
        <circle cx="220.341" cy="224.172" style="stroke-width:1;fill:#a27953;transform-origin:220.341px 224.172px" r="21.362"/>
        <circle cx="220.592" cy="224.372" style="fill:#b28760;stroke-width:1;transform-origin:220.592px 224.372px" r="19.185"/>
        <circle cx="220.381" cy="224.365" style="stroke-width:1;fill:#a27953;transform-origin:220.381px 224.365px" r="16.78"/>
        <circle cx="220.411" cy="224.44" style="fill:#b28760;stroke-width:1;transform-origin:220.411px 224.44px" r="14.4"/>
        <rect x="-2" width="6" height="87.908" rx="3" transform="rotate(27.193 -123.379 464.595)skewX(-.046)" style="stroke-width:1;fill:#3e7a30;transform-origin:1px 43.955px"/>
        <rect x="-2" width="6" height="69.286" rx="3" fill="color(srgb 24.3% 47.8% 18.8%)" transform="rotate(-9.141 840.781 -993.913)" style="stroke-width:1;transform-origin:1px 34.643px"/>
        <path d="M102.796 165.116c-5.066-13.954 3.821-32.974 26.148-41.08 11.162-4.053 24.138-5.12 35.533-3.183 8.994 1.352 9.438 9.937 1.599 19.465-7.838 9.528-20.886 16.087-35.746 19.661-14.558 4.07-24.139 5.12-27.534 5.137" fill="#3f6b3f" style="stroke-width:.949;transform-origin:191.668px 136.027px"/>
        <rect x="-2" width="6" height="52.908" rx="3" transform="rotate(53.707 -46.398 274.325)skewX(-.046)" style="stroke-width:1;fill:#3e7a30;transform-origin:1px 26.455px"/>
        <path d="M250.805 199.9c6.505-7.806 5.205-22.116-7.285-32.525-6.243-5.203-14.349-8.906-22.136-10.307-6.105-1.22-8.385 4.203-5.554 12.16 2.831 7.955 9.707 15.211 18.443 20.965 8.426 6.004 14.35 8.907 16.532 9.707" fill="#3f6b3f" style="stroke-width:.949;transform-origin:280.305px 161.442px"/>
        <path d="M257.642 166.94c9.255-9.6 8.911-28.454-6.449-43.264-7.678-7.403-17.937-13.02-27.995-15.593-7.875-2.177-11.375 4.706-8.424 15.389s11.262 20.831 22.15 29.193c10.46 8.659 17.937 13.021 20.718 14.275" fill="#3f6b3f" style="stroke-width:.949;transform-origin:299.906px 119.402px"/>
        <rect x="-2" width="6" height="52.017" transform="rotate(-3.24 2014.037 -3369.526)skewX(-.047)" style="stroke-width:1;fill:#3e7a30;transform-origin:1px 26.009px" rx="3" ry="3"/>
        <path d="M147.135 111.497c.717-7.086 10.683-12.987 25.485-11.089 7.398.949 15.06 3.589 21.046 7.118 4.772 2.711 2.81 6.434-4.11 8.584-6.919 2.15-16.04 1.808-25.421-.224-9.337-1.75-15.062-3.587-17-4.389" fill="#3f6b3f" style="stroke-width:.949;transform-origin:150.523px 74.885px"/>
        <circle cx="128.214" cy="181.605" style="stroke-width:1;transform-origin:128.214px 181.605px;fill:#432c17" r="4.973"/>
        <ellipse cx="137.793" cy="213.295" rx="7.884" ry="3.137" style="stroke-width:1;fill:#432c17;transform-box:fill-box;transform-origin:317.579% -172.822%" transform="rotate(16.07 -81.48 128.666)skewX(54.832)"/>
      </g>
      <path d="m16.489 12.757-4.577-.232c-.476-.099-1.799.762-.813 1.571l1.418 1.164-7.049 4.331c-.744.411-.081 1.085.663.674l8.449-3.306s-5.255 9.367-5.24 9.714c-.481 1.186.757.745.935.305l7.945-9.169c-.01.001 1.162 4.756 1.537 5.275 1.814 2.519 3.07-2.181 3.075-3.698l-.122-2.67c-.534.17 5.556 5.664 6.692 5.303 1.367 1.173 1.424-3.012-.624-5.545l-2.427-3.034z" style="fill:#316126;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(2.336)"/>
    </g>
    `;
}

  if (showShell) {
    decorations += `
      <g transform="translate(600, ${height-38})">
        <ellipse cx="-3.548" cy="18.516" rx="19.202" ry="7.265" fill="#000" opacity=".15" style="stroke-width:1"/>
        <ellipse cx="-3.354" cy="11.373" rx="18" ry="12" style="fill:#ecd6ad"/>
        <path d="M-1.538 19.228C-4.149 15.627-12.025-5.978 10.13 3.453" style="stroke-width:1;fill:rgb(236, 214, 173);stroke:#caa97e;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(130.458)"/>
        <circle cx=".986" cy="11.184" r="5" fill="#ffefd5"/>
        <circle cx="3.366" cy="9.304" r="1.5" fill="#fff" opacity=".8" style="stroke-width:1"/>
        <ellipse cx="-110.58" cy="26.013" rx="18.217" ry="8.331" style="stroke-width:1;fill:#fae3b7;transform-box:fill-box;transform-origin:50% 50%" transform="rotate(-36.611 16.225 -169.537)"/>
        <path d="M-11.544 11.857c-7.07-2.787-14.91-12.59 9.84-10.348" style="stroke-width:1;stroke:#ebc696;fill:rgb(250, 227, 183);transform-origin:-11.455px 9.203px" transform="rotate(-49.542)"/>
      </g>
    `;
 } else if (showStatue) {
  decorations += `
    <g transform="translate(600, ${height-38})">  
      <ellipse cx="-8.487" cy="22.437" rx="24.75" ry="7.2" fill="#000" opacity=".15" style="stroke-width: 1; transform-origin: -8.487px -13.569px;"></ellipse>
      <rect x="-66.872" y="-105.43" width="25.671" height="5.704" style="stroke-width: 1; fill: rgb(121, 124, 120); transform-origin: -44.299px -122.663px;" transform="matrix(0.096533, -0.99533, 0.99533, 0.096535, 35.811931, 109.093926)" rx="2.053" ry="2.053"></rect>
      <rect x="-66.872" y="-105.43" width="25.671" height="5.704" style="stroke-width: 1; fill: rgb(121, 124, 120); transform-origin: -44.427px -84.983px;" transform="matrix(0.096533, -0.99533, 0.99533, 0.096535, 35.940627, 71.413704)" rx="2.139" ry="2.139"></rect>
      <rect x="-17.246" y="-17.928" width="38.129" height="41.15" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: 0.509px -13.569px;" rx="9.166" ry="9.166" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -8.995881, -0.000004)"></rect>
      <rect x="-14.717" y="-54.536" width="33.08" height="50.242" style="fill: rgb(121, 124, 120); transform-origin: 0.509px -13.569px;" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -8.995881, -0.000004)"></rect>
      <ellipse cx="1.824" cy="-3.763" rx="16.54" ry="8.588" style="fill: rgb(121, 124, 120); transform-origin: 0.509px -13.569px;" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -8.995879, -0.000009)"></ellipse>
      <rect x="-14.819" y="-56.775" width="33.311" height="11.239" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: 0.513px -13.569px;" rx="3.084" ry="3.084" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -9.007509, -0.012056)"></rect>
      <rect x="38.53" y="50.333" width="33.08" height="11.239" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: 79.443px 57.065px;" transform="matrix(-0.096533, 0.99533, -0.99533, -0.096535, -87.930104, -70.633588)"></rect>
      <rect x="-8.667" y="19.705" width="14.095" height="4.788" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: -0.509px 13.569px;" transform="matrix(-0.99533, -0.096535, 0.096533, -0.99533, -7.977685, -27.137483)" rx="2.087" ry="2.087"></rect>
      <rect x="9.042" y="-41.972" width="8.495" height="2.379" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: 0.509px -13.569px;" rx="3.245" ry="3.245" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -8.995881, -0.000004)"></rect>
      <rect x="-13.741" y="-41.956" width="8.495" height="2.379" style="stroke-width: 1; fill: rgb(80, 80, 80); transform-origin: 0.509px -13.569px;" rx="3.245" ry="3.245" transform="matrix(0.99533, 0.096535, -0.096533, 0.99533, -8.995881, -0.000004)"></rect>
      <path style="fill: none; stroke-width: 3px; stroke: rgb(80, 80, 80); transform-origin: -13.677px -13.569px;" d="M -17.156 -8.557 C -16.958 -13.547 2.118 -11.695 1.92 -6.707"></path>
    </g>
    `;
}

  if (showBubbles) {
    decorations += `
      <g>
        <circle cx="119.779" cy="199.491" r="4" fill="#adf" opacity=".6" style="stroke-width:.8">
          <animate attributeName="cy" from="${height-30}" to="30" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from=".6" to="0" dur="5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="124.779" cy="219.491" r="2.5" fill="#adf" opacity=".5">
          <animate attributeName="cy" from="${height-25}" to="40" dur="5.5s" repeatCount="indefinite" begin="0.3s"/>
          <animate attributeName="opacity" from=".5" to="0" dur="5.5s" repeatCount="indefinite" begin="0.3s"/>
        </circle>
        <circle cx="117.779" cy="239.491" r="3" fill="#adf" opacity=".4">
          <animate attributeName="cy" from="${height-20}" to="35" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
          <animate attributeName="opacity" from=".4" to="0" dur="4.8s" repeatCount="indefinite" begin="0.6s"/>
        </circle>
      </g>
      <g>
        <circle cx="380" cy="150" r="3" fill="#adf" opacity="0.5">
          <animate attributeName="cy" from="${height-35}" to="45" dur="6s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" from="0.5" to="0" dur="6s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="385" cy="180" r="2" fill="#adf" opacity="0.4">
          <animate attributeName="cy" from="${height-28}" to="50" dur="5.2s" repeatCount="indefinite" begin="1.5s" />
          <animate attributeName="opacity" from="0.4" to="0" dur="5.2s" repeatCount="indefinite" begin="1.5s" />
        </circle>
      </g>
      <g>
        <circle cx="580" cy="120" r="3.5" fill="#adf" opacity="0.6">
          <animate attributeName="cy" from="${height-40}" to="25" dur="4.5s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="opacity" from="0.6" to="0" dur="4.5s" repeatCount="indefinite" begin="2s" />
        </circle>
        <circle cx="575" cy="140" r="2" fill="#adf" opacity="0.4">
          <animate attributeName="cy" from="${height-32}" to="35" dur="5s" repeatCount="indefinite" begin="2.3s" />
          <animate attributeName="opacity" from="0.4" to="0" dur="5s" repeatCount="indefinite" begin="2.3s" />
        </circle>
        <circle cx="588" cy="160" r="2.8" fill="#adf" opacity="0.5">
          <animate attributeName="cy" from="${height-25}" to="40" dur="5.8s" repeatCount="indefinite" begin="2.6s" />
          <animate attributeName="opacity" from="0.5" to="0" dur="5.8s" repeatCount="indefinite" begin="2.6s" />
        </circle>
      </g>
      <g>
        <circle cx="750" cy="180" r="2.5" fill="#adf" opacity="0.5">
          <animate attributeName="cy" from="${height-30}" to="50" dur="6.5s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="opacity" from="0.5" to="0" dur="6.5s" repeatCount="indefinite" begin="0.8s" />
        </circle>
      </g>
    `;
  }

  const frameHighlightColor = adjustColor(frameColor, 30);
  const glassFrame = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${frameColor}" stroke-width="8" />
    <rect x="4" y="4" width="${width-8}" height="${height-8}" fill="none" stroke="${frameHighlightColor}" stroke-width="2" opacity="0.3" />
    <rect x="0" y="0" width="${width}" height="15" fill="url(#reflectionGrad)" />
  `;

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${background}
      ${decorations}

      ${fishElements.join('\n')}

      ${showLegend ? `
        <g transform="translate(${width - 200}, 0)"> 
          <rect x="0" y="10" width="190" height="${legendItems.length * 28 + 15}" fill="rgba(0, 0, 0, 0.2)" rx="6" />
          <g font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="600" fill="#ffffff">
            ${legendItems.join('\n')}
          </g>
        </g>
      ` : ''}

      ${showFrame ? glassFrame : ''}

    </svg>
  `;

  return svg;
}
module.exports = { generateAquariumSVG };