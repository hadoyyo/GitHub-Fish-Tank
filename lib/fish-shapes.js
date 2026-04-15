const FISH_SHAPES = {
  // Defaultshapes

  default: (color) => `
    <g>
      <circle cx="7.071" cy="-6.202" r="1.772" fill="#000" style="stroke-width:1"/>
      <circle cx="7.324" cy="-6.616" r="0.8" fill="#fff" style="stroke-width:1"/>
      <path d="M -17.621 -3.973 C -7.621 -10.64 2.379 -10.64 12.379 -3.973 C 2.379 2.693 -7.621 2.693 -17.621 -3.973" fill="${color}" style="stroke-width:1"/>
      <path d="M -17.621 -5.495 L -12.621 3.505 L -12.621 -12.495 L -17.621 -5.495 Z" fill="${color}" opacity=".9" style="stroke-width: 1; transform-origin: -15.121px -4.495px;" transform="matrix(-1, 0, 0, -1, -0.00000572, -0.00000286)"/>
      <circle cx="4.379" cy="-5.973" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="4.879" cy="-6.473" r="0.8" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  round: (color) => `
    <g>
      <ellipse cx="6.873" cy="-2.533" rx="18" ry="12" fill="red" style="stroke-width: 1;"/>
      <path d="M -9.296 -2.533 L -16.296 -8.533 L -16.296 3.467 L -9.296 -2.533 Z" fill="${color}" opacity="0.9" style="stroke-width: 1;"/>
      <circle cx="14.873" cy="-5.533" r="2.5" fill="#000" style="stroke-width: 1;"/>
      <circle cx="15.373" cy="-6.033" r="1" fill="#fff" style="stroke-width: 1;"/>
      <path d="M 1.846 -10.624 L -5.154 -16.624 L -5.154 -4.624 L 1.846 -10.624 Z" fill="${color}" opacity="0.9" style="stroke-width: 1;"/>
      <path style="fill: none; stroke: rgb(0, 0, 0);" d="M 18.686 -11.419 C 21.626 -14.173 29.174 -16.239 30.445 -12.849"/>
      <ellipse cx="30.446" cy="-11.656" rx="1.599" ry="1.599" color="yellow" fill="yellow"/>
    </g>
  `,

  long: (color) => `
    <g>
      <circle cx="23.228" cy="-5.144" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="23.728" cy="-5.644" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M-17.001-2.599q10 8 25 5 10-3 20-5-10-2-20-5-15-3-25 5" fill="${color}" style="stroke-width:1;transform-origin:5.499px -2.599px" transform="scale(-1)"/>
      <circle cx="21.111" cy="-4.52" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="21.611" cy="-5.02" r=".8" fill="#fff" style="stroke-width:1"/>
      <path style="fill:${color};stroke-width:0;stroke-miterlimit:1;stroke-linejoin:round" d="M-18.391-6.188s1.166 2.735 1.563 3.729l-1.734 3.37 10.8-3.677z"/>
      <path style="fill:${color};stroke-width:1" d="M11.745 2.554 15 2.438 8.788 5.423l1.168-2.616z"/>
    </g>
  `,

  angel: (color) => `
    <g>
      <ellipse cx="2.125" cy="-2.793" rx="15" ry="5.953" fill="${color}" style="stroke-width:1"/>
      <path d="m-11.541-2.716-7-10v20z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <path d="m-2.875-7.774 5-10 5 10zm0 9.995 5 10 5-10z" fill="${color}" opacity=".6" style="stroke-width:1"/>
      <circle cx="13.625" cy="-4.053" r="1.26" fill="#000" style="stroke-width:1"/>
      <circle cx="13.94" cy="-4.368" r=".504" fill="#fff" style="stroke-width:1"/>
    </g>
  `,

  tetra: (color) => `
    <g>
      <circle cx="17.892" cy="-6.241" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="18.392" cy="-6.741" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="m-10.628-2.721 14.996-12 20 12-20 12z" fill="${color}" style="stroke-width:1"/>
      <path d="m-7.598-2.721-10.879-6.103 2.879 12.103z" fill="${color}" opacity=".9" style="stroke-width:1"/>
      <circle cx="15.992" cy="-5.969" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="16.492" cy="-6.469" r=".8" fill="#fff" style="stroke-width:1"/>
      <path d="M23.173-2.626 19.658.259 16.3-5.185l4.796 1.847z" fill="${color}" style="stroke-width:1;transform-origin:19.7365px -2.463px" transform="scale(-1)"/>
    </g>
  `,

  // Language-specific shapes

  javascript: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="16" ry="14" fill="${color}" />
      <path d="M-6,0 L-14,-5 L-14,5 Z" fill="${color}" opacity="0.8" />
      <line x1="10" y1="-14" x2="10" y2="-21" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="20" y1="-10" x2="25" y2="-15" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="24" y1="0" x2="32" y2="0" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="20" y1="10" x2="25" y2="15" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="10" y1="14" x2="10" y2="21" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="-1" y1="11" x2="-5" y2="16" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="-1" y1="-11" x2="-5" y2="-16" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <circle cx="20" cy="-3" r="2.5" fill="#000" />
      <circle cx="20.5" cy="-3.5" r="1" fill="#fff" />
    </g>
  `,

  typescript: (color) => `
    <g>
      <circle cx="19.924" cy="-8.125" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="20.424" cy="-8.625" r=".8" fill="#fff" style="stroke-width:1"/>
      <path fill="${color}" style="stroke-width:1" d="m24.705-4.661-12-11h-23v22h23z"/>
      <path fill="${color}" opacity=".9" style="stroke-width:1" d="m-8.536-4.661-9-7v14z"/>
      <path stroke="#fff" stroke-width=".8" style="stroke-width:.8" d="M-3.296-15.661v22m10-22v22"/>
      <circle cx="17.704" cy="-7.661" r="2" fill="#000" style="stroke-width:1"/>
      <circle cx="18.204" cy="-8.161" r=".8" fill="#fff" style="stroke-width:1"/>
      <path fill="${color}" style="stroke-width:1" d="M6.104 6.248.58 1.951v8.594z"/>
    </g>
  `,

  python: (color) => `
    <g>
      <path d="M-18,0 Q-10,-12 0,-6 Q10,-2 20,-8 Q28,-12 34,0 Q28,12 20,8 Q10,2 0,6 Q-10,12 -18,0 Z" fill="${color}" />
      <path d="M-18,0 L-26,-6 L-26,6 Z" fill="${color}" opacity="0.8" />
      <circle cx="28" cy="-3" r="2" fill="#000" />
      <circle cx="28.5" cy="-3.5" r="0.8" fill="#fff" />
      <path d="M-5,-6 Q0,-10 5,-6" fill="none" stroke="#fff" stroke-width="1" opacity="0.3" />
    </g>
  `,

  java: (color) => `
    <g>
      <path d="M0,0 Q8,-13 22,-10 Q35,-7 32,0 Q35,7 22,10 Q8,13 0,0 Z" fill="${color}" />
      <path d="M0,0 L-10,-7 L-10,7 Z" fill="${color}" opacity="0.8" />
      <path d="M5,-10 Q10,-15 15,-10" fill="${color}" opacity="0.5" />
      <path d="M5,10 Q10,15 15,10" fill="${color}" opacity="0.5" />
      <path d="M8,-10 Q12,-4 8,0 Q12,4 8,10" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3" />
      <path d="M15,-9 Q19,-4 15,0 Q19,4 15,9" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3" />
      <circle cx="26" cy="-3" r="2.2" fill="#000" />
      <circle cx="26.5" cy="-3.5" r="0.9" fill="#fff" />
    </g>
  `,

  cpp: (color) => `
    <g>
      <path d="M35,0 L10,-8 L-15,-5 L-15,5 L10,8 Z" fill="${color}" />
      <path d="M-15,0 L-24,-7 L-24,7 Z" fill="${color}" opacity="0.8" />
      <path d="M20,-8 L27,-14 L27,-4" fill="${color}" opacity="0.55" />
      <path d="M20,8 L27,14 L27,4" fill="${color}" opacity="0.55" />
      <circle cx="28" cy="-2" r="2" fill="#000" />
      <circle cx="28.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  csharp: (color) => `
    <g>
      <path d="M32,0 L16,-13 L-4,0 L16,13 Z" fill="${color}" />
      <path d="M-4,0 L-13,-6 L-13,6 Z" fill="${color}" opacity="0.8" />
      <path d="M10,-13 L10,13" stroke="#fff" stroke-width="1" opacity="0.2" />
      <circle cx="24" cy="-3" r="2" fill="#000" />
      <circle cx="24.5" cy="-3.5" r="0.8" fill="#fff" />
    </g>
  `,

  go: (color) => `
    <g>
      <ellipse cx="8" cy="0" rx="17" ry="11" fill="${color}" />
      <path d="M-9,0 L-17,-5 L-17,5 Z" fill="${color}" opacity="0.8" />
      <ellipse cx="16" cy="0" rx="6" ry="8" fill="${color}" opacity="0.6" />
      <circle cx="20" cy="-3" r="2.5" fill="#000" />
      <circle cx="20.5" cy="-3.5" r="1" fill="#fff" />
      <circle cx="8" cy="-5" r="3" fill="none" stroke="#fff" stroke-width="0.8" opacity="0.3" />
    </g>
  `,

  rust: (color) => `
    <g>
      <path d="M0,0 Q10,-10 28,-6 Q36,-3 30,0 Q36,3 28,6 Q10,10 0,0 Z" fill="${color}" />
      <path d="M0,0 L-8,-6 L-8,6 Z" fill="${color}" opacity="0.8" />
      <path d="M28,-6 L35,-12 L32,-5" fill="${color}" opacity="0.7" />
      <path d="M28,6 L35,12 L32,5" fill="${color}" opacity="0.7" />
      <circle cx="26" cy="-2" r="2.2" fill="#000" />
      <circle cx="26.5" cy="-2.5" r="0.9" fill="#fff" />
    </g>
  `,

  ruby: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="16" ry="9" fill="${color}" />
      <path d="M-6,0 L-13,-6 L-13,6 Z" fill="${color}" opacity="0.8" />
      <path d="M4,-9 Q8,-22 18,-16 Q14,-9 4,-9 Z" fill="${color}" opacity="0.65" />
      <path d="M4,9 Q8,22 18,16 Q14,9 4,9 Z" fill="${color}" opacity="0.65" />
      <circle cx="19" cy="-2" r="2" fill="#000" />
      <circle cx="19.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  php: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="20" ry="7" fill="${color}" />
      <path d="M-10,0 L-18,-4 L-18,4 Z" fill="${color}" opacity="0.8" />
      <path d="M0,-7 Q5,-14 12,-7" fill="${color}" opacity="0.55" />
      <path d="M0,7 Q5,14 12,7" fill="${color}" opacity="0.55" />
      <circle cx="22" cy="-2" r="2" fill="#000" />
      <circle cx="22.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  swift: (color) => `
    <g>
      <path d="M0,0 Q10,-6 30,-2 Q24,0 30,2 Q10,6 0,0 Z" fill="${color}" />
      <path d="M0,0 L-8,-10 L-4,0 L-8,10 Z" fill="${color}" opacity="0.85" />
      <circle cx="26" cy="-1" r="2" fill="#000" />
      <circle cx="26.5" cy="-1.5" r="0.8" fill="#fff" />
    </g>
  `,

  kotlin: (color) => `
    <g>
      <path d="M-12,-14 L18,0 L-12,14 L-4,0 Z" fill="${color}" />
      <path d="M-12,0 L-20,-6 L-20,6 Z" fill="${color}" opacity="0.7" />
      <path d="M5,-8 L18,0 L5,0 Z" fill="${color}" opacity="0.55" />
      <circle cx="14" cy="-3" r="2" fill="#000" />
      <circle cx="14.5" cy="-3.5" r="0.8" fill="#fff" />
    </g>
  `,

  html: (color) => `
    <g>
      <path d="M32,6 Q20,10 0,8 L0,-8 Q20,-10 32,-6 Q36,0 32,6 Z" fill="${color}" />
      <path d="M0,8 L-8,14 L-8,-14 L0,-8 Z" fill="${color}" opacity="0.8" />
      <circle cx="26" cy="-2" r="2" fill="#000" />
      <circle cx="26.5" cy="-2.5" r="0.8" fill="#fff" />
      <path d="M32,-6 Q38,-3 38,0 Q38,3 32,6" fill="none" stroke="${color}" stroke-width="2" opacity="0.6" />
    </g>
  `,

  css: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="16" ry="10" fill="${color}" />
      <path d="M-6,0 L-14,-6 L-14,6 Z" fill="${color}" opacity="0.8" />
      <rect x="4" y="-10" width="4" height="20" fill="#fff" opacity="0.2" rx="2" />
      <path d="M6,-10 Q10,-20 16,-12" fill="${color}" opacity="0.6" />
      <path d="M6,10 Q10,20 16,12" fill="${color}" opacity="0.6" />
      <circle cx="19" cy="-2" r="2" fill="#000" />
      <circle cx="19.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  shell: (color) => `
    <g>
      <path d="M-20,0 Q-10,-8 0,-3 Q10,3 20,-3 Q30,-8 38,0 Q30,6 20,3 Q10,-3 0,3 Q-10,8 -20,0 Z" fill="${color}" />
      <path d="M-20,0 L-28,-4 L-28,4 Z" fill="${color}" opacity="0.8" />
      <circle cx="32" cy="-2" r="2" fill="#000" />
      <circle cx="32.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  vue: (color) => `
    <g>
      <ellipse cx="8" cy="0" rx="14" ry="9" fill="${color}" />
      <path d="M-6,0 L-15,-12 L-10,0 L-15,12 Z" fill="${color}" opacity="0.85" />
      <path d="M-6,0 L-18,-6 L-13,0 L-18,6 Z" fill="${color}" opacity="0.55" />
      <circle cx="17" cy="-2" r="2" fill="#000" />
      <circle cx="17.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  dart: (color) => `
    <g>
      <path d="M38,0 L5,-4 L-14,-2 L-14,2 L5,4 Z" fill="${color}" />
      <path d="M-14,0 L-20,-5 L-20,5 Z" fill="${color}" opacity="0.8" />
      <circle cx="33" cy="-1" r="1.8" fill="#000" />
      <circle cx="33.5" cy="-1.5" r="0.7" fill="#fff" />
    </g>
  `,

  scala: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="16" ry="10" fill="${color}" />
      <path d="M-6,0 L-14,-5 L-14,5 Z" fill="${color}" opacity="0.8" />
      <line x1="2" y1="-10" x2="-2" y2="-20" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="-10" x2="6" y2="-21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="14" y1="-10" x2="14" y2="-21" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="20" y1="-8" x2="22" y2="-18" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="4" y1="10" x2="2" y2="18" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
      <line x1="12" y1="10" x2="12" y2="19" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
      <circle cx="20" cy="-2" r="2.2" fill="#000" />
      <circle cx="20.5" cy="-2.5" r="0.9" fill="#fff" />
    </g>
  `,

  haskell: (color) => `
    <g>
      <path d="M0,0 Q8,-10 22,-8 Q32,-5 28,0 Q32,5 22,8 Q8,10 0,0 Z" fill="${color}" />
      <path d="M0,0 Q-6,-8 -12,-14 L-12,-4 L-5,0 L-12,4 L-12,14 Q-6,8 0,0 Z" fill="${color}" opacity="0.8" />
      <circle cx="24" cy="-2" r="2" fill="#000" />
      <circle cx="24.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,

  elixir: (color) => `
    <g>
      <path d="M0,0 Q4,-14 16,-14 Q28,-14 28,0 Q28,10 16,12 Q4,10 0,0 Z" fill="${color}" />
      <line x1="8" y1="12" x2="5" y2="22" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <line x1="14" y1="12" x2="13" y2="24" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <line x1="20" y1="11" x2="21" y2="22" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
      <circle cx="20" cy="-6" r="2.2" fill="#000" />
      <circle cx="20.5" cy="-6.5" r="0.9" fill="#fff" />
    </g>
  `,

  clojure: (color) => `
    <g>
      <circle cx="8" cy="0" r="14" fill="${color}" />
      <path d="M-6,0 L-14,-5 L-14,5 Z" fill="${color}" opacity="0.8" />
      <circle cx="8" cy="0" r="8" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.25" />
      <circle cx="16" cy="-4" r="2.5" fill="#000" />
      <circle cx="16.5" cy="-4.5" r="1" fill="#fff" />
    </g>
  `,

  lua: (color) => `
    <g>
      <ellipse cx="8" cy="0" rx="12" ry="17" fill="${color}" />
      <path d="M-4,0 L-10,-4 L-10,4 Z" fill="${color}" opacity="0.8" />
      <path d="M8,-17 L14,-24 L14,-17 Z" fill="${color}" opacity="0.6" />
      <path d="M8,17 L14,24 L14,17 Z" fill="${color}" opacity="0.6" />
      <circle cx="14" cy="-5" r="2.2" fill="#000" />
      <circle cx="14.5" cy="-5.5" r="0.9" fill="#fff" />
    </g>
  `,

  r: (color) => `
    <g>
      <path d="M14,-14 Q22,-10 20,0 Q22,10 14,14 Q6,12 4,4 Q0,8 -6,8 Q-2,0 4,-4 Q6,-12 14,-14 Z" fill="${color}" />
      <path d="M4,4 Q0,8 -6,8" stroke="${color}" stroke-width="2" fill="none" />
      <circle cx="18" cy="-8" r="2.2" fill="#000" />
      <circle cx="18.5" cy="-8.5" r="0.9" fill="#fff" />
    </g>
  `,

  dockerfile: (color) => `
    <g>
      <rect x="-10" y="-10" width="36" height="20" fill="${color}" rx="3" />
      <path d="M-10,0 L-18,-6 L-18,6 Z" fill="${color}" opacity="0.8" />
      <rect x="-4" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <rect x="4" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <rect x="12" y="-6" width="5" height="12" fill="#fff" opacity="0.15" rx="1" />
      <circle cx="20" cy="-3" r="2" fill="#000" />
      <circle cx="20.5" cy="-3.5" r="0.8" fill="#fff" />
    </g>
  `,
};

const LANGUAGE_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#178600',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#F05138',
  'Kotlin': '#A97BFF',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Shell': '#89e051',
  'Vue': '#41b883',
  'Dart': '#00B4AB',
  'R': '#198CE7',
  'MATLAB': '#e16737',
  'Lua': '#000080',
  'Perl': '#0298c3',
  'Scala': '#c22d40',
  'Haskell': '#5e5086',
  'Elixir': '#6e4a7e',
  'Clojure': '#db5855',
  'Erlang': '#B83998',
  'Julia': '#a270ba',
  'Dockerfile': '#384d54'
};

const LANGUAGE_SHAPES = {
  'JavaScript':  'javascript',
  'TypeScript':  'typescript',
  'Python':      'python',
  'Java':        'java',
  'C++':         'cpp',
  'C#':          'csharp',
  'Go':          'go',
  'Rust':        'rust',
  'Ruby':        'ruby',
  'PHP':         'php',
  'Swift':       'swift',
  'Kotlin':      'kotlin',
  'HTML':        'html',
  'CSS':         'css',
  'Shell':       'shell',
  'Vue':         'vue',
  'Dart':        'dart',
  'Scala':       'scala',
  'Haskell':     'haskell',
  'Elixir':      'elixir',
  'Clojure':     'clojure',
  'Lua':         'lua',
  'R':           'r',
  'Dockerfile':  'dockerfile',
};

const DEFAULT_SHAPES = ['default', 'round', 'long', 'angel', 'tetra'];

function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] || '#8b8b8b';
}

function getFishShape(shapeName, color) {
  const shape = FISH_SHAPES[shapeName] || FISH_SHAPES.default;
  return shape(color);
}

function resolveShapeForLanguage(language, shapePreference = {}, index = 0) {
  if (shapePreference[language]) return shapePreference[language];
  if (LANGUAGE_SHAPES[language]) return LANGUAGE_SHAPES[language];
  return DEFAULT_SHAPES[index % DEFAULT_SHAPES.length];
}

module.exports = {
  FISH_SHAPES,
  LANGUAGE_COLORS,
  LANGUAGE_SHAPES,
  DEFAULT_SHAPES,
  getLanguageColor,
  getFishShape,
  resolveShapeForLanguage,
};
