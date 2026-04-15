const { getLanguageColor, getFishShape, resolveShapeForLanguage } = require('./fish-shapes');

function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
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
    bgColor = '#17407d',
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
    const shapeName = resolveShapeForLanguage(language, shapePreference, index);

    const size = Math.max(20, Math.min(45, 20 + (percentage / 100) * 28));
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

      <text
        x="0"
        y="22"
        font-size="11"
        fill="#8899aa"
        font-family="monospace"
        text-anchor="middle"
        opacity="0.7"
      >
        ${language}
      </text>
    </g>
  `;

    fishElements.push(fishSVG);

    if (showLegend) {
      legendItems.push(`
      <g transform="translate(10, ${20 + index * 22})">
        <rect x="0" y="0" width="14" height="14" fill="${color}" rx="2" stroke="#000" stroke-width="0.5" />
        <text x="20" y="11" font-size="11" fill="#ccd6f6" font-family="monospace">${language}: ${percentage.toFixed(1)}%</text>
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

  let decorations = '';

  if (showDecorations) {
    decorations += `
      <path d="M0,${height-25} Q80,${height-35} 160,${height-28} Q240,${height-38} 320,${height-25} Q400,${height-32} 480,${height-28} Q560,${height-35} 640,${height-25} Q720,${height-30} 800,${height-28} L800,${height} L0,${height} Z" fill="url(#sandGrad)" />
      <ellipse cx="100" cy="${height-20}" rx="30" ry="5" fill="#B89A64" opacity="0.4" />
      <ellipse cx="500" cy="${height-22}" rx="45" ry="6" fill="#B89A64" opacity="0.3" />
      <ellipse cx="700" cy="${height-18}" rx="25" ry="4" fill="#B89A64" opacity="0.4" />
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
        <g transform="translate(550, ${height-50})" opacity="0.85">
          <ellipse cx="-16.963" cy="25.707" rx="23.369" ry="4.291" fill="#000" opacity=".15" style="stroke-width:1;transform-origin:-19.959px 4.651px"/>
          <circle cx="-11.795" cy="-21.151" r="2.948" fill="#ff9a9a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <path d="M-20.475 24.293q-5.895-11.788 0-23.576c-7.859 3.929-16.174-3.564-18.139-11.422 3.93-3.93 12.243 1.598 18.139 5.528-1.966-11.788 5.386-20.933 11.28-22.898 5.304 6.46 2.374 12.744.507 22.898 5.895-3.93 8.113-6.056 12.043-2.126C1.389.556-.829 4.646-8.688.717q5.895 11.788 0 23.576z" fill="#ff7a7a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <path d="M-17.322 24.247q-2.947-11.787 2.947-17.681-2.947-11.788 2.947-14.737 2.947 8.843-2.947 32.418z" fill="#ff5252" opacity=".6" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <path d="M-38.103 25.608q-3.135-6.273 0-12.545c-4.182 2.091-8.148 1.945-9.192-2.237 2.093-2.091 6.055-2.99 9.192-.901-1.046-6.272-1.351-7.829 1.785-8.875 3.136 1.046 5.534 2.603 4.488 8.875 3.136-2.089 5.75-3.891 7.842-1.8-1.046 4.182-3.66 7.029-7.842 4.938q3.137 6.272 0 12.545z" style="stroke-width:1;fill:#fe5d72;transform-origin:-19.393px 1.143px"/>
          <circle cx="-36.294" cy="-12.308" r="3.537" fill="#ff9a9a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <circle cx="1.907" cy="-.596" r="3.537" fill="#ff9a9a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <circle cx="-20.335" cy="-17.445" r="3.537" fill="#ff9a9a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <circle cx="-6.267" cy="-24.339" r="3.537" fill="#ff9a9a" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
          <path d="M-.141 26.989q-1.743-3.489 0-6.978-3.49 1.743-4.361-1.744 1.744-1.747 4.361 0c-.582-3.489 1.331-5.691 3.075-6.274 1.744.583.996 2.785.413 6.274q2.618-1.747 4.362 0-.872 3.487-4.362 1.744 1.746 3.489 0 6.978z" style="stroke-width:1;fill:#fe5d72;transform-origin:-19.393px 1.143px"/>
          <circle cx="-32.894" cy="5.359" r="2.209" fill="#ff847c" style="stroke-width:1;transform-origin:-19.393px 1.143px"/>
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
    }

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
  }

  const glassFrame = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#3a4a5a" stroke-width="8" />
    <rect x="4" y="4" width="${width-8}" height="${height-8}" fill="none" stroke="#5a7a8a" stroke-width="2" opacity="0.3" />
    <rect x="0" y="0" width="${width}" height="15" fill="url(#reflectionGrad)" />
  `;

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${background}
      ${decorations}

      ${fishElements.join('\n')}

      ${showLegend ? `
        <g transform="translate(${width - 180}, 15)">
          <rect x="0" y="0" width="170" height="${legendItems.length * 22 + 18}" fill="rgba(10, 25, 47, 0.85)" rx="6" stroke="#3a4a5a" stroke-width="1" />
          ${legendItems.join('\n')}
        </g>
      ` : ''}

      ${glassFrame}

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

module.exports = { generateAquariumSVG };
