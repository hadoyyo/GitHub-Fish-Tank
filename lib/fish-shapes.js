const FISH_SHAPES = {
  default: (color) => `
    <g>
      <path d="M0,0 Q15,-10 30,0 Q15,10 0,0 Z" fill="${color}" />
      <path d="M-10,0 L-5,-8 L-5,8 Z" fill="${color}" opacity="0.8" />
      <circle cx="22" cy="-2" r="2" fill="#000" />
      <circle cx="22.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,
  
  round: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="18" ry="12" fill="${color}" />
      <path d="M-8,0 L-15,-6 L-15,6 Z" fill="${color}" opacity="0.8" />
      <circle cx="18" cy="-3" r="2.5" fill="#000" />
      <circle cx="18.5" cy="-3.5" r="1" fill="#fff" />
      <circle cx="8" cy="4" r="1.5" fill="${color}" stroke="#000" stroke-width="0.3" opacity="0.5" />
    </g>
  `,
  
  long: (color) => `
    <g>
      <path d="M-15,0 Q-5,-8 10,-5 Q20,-2 30,0 Q20,2 10,5 Q-5,8 -15,0 Z" fill="${color}" />
      <circle cx="22" cy="-2" r="2" fill="#000" />
      <circle cx="22.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,
  
  angel: (color) => `
    <g>
      <ellipse cx="10" cy="0" rx="15" ry="8" fill="${color}" />
      <path d="M-5,0 L-12,-10 L-12,10 Z" fill="${color}" opacity="0.8" />
      <path d="M5,-8 L10,-18 L15,-8 Z" fill="${color}" opacity="0.6" />
      <path d="M5,8 L10,18 L15,8 Z" fill="${color}" opacity="0.6" />
      <circle cx="18" cy="-2" r="2" fill="#000" />
      <circle cx="18.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `,
  
  tetra: (color) => `
    <g>
      <path d="M-10,0 L5,-12 L25,0 L5,12 Z" fill="${color}" />
      <path d="M-10,0 L-18,-6 L-18,6 Z" fill="${color}" opacity="0.7" />
      <circle cx="16" cy="-2" r="2" fill="#000" />
      <circle cx="16.5" cy="-2.5" r="0.8" fill="#fff" />
    </g>
  `
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

function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] || '#8b8b8b';
}

function getFishShape(shapeName, color) {
  const shape = FISH_SHAPES[shapeName] || FISH_SHAPES.default;
  return shape(color);
}

module.exports = { FISH_SHAPES, LANGUAGE_COLORS, getLanguageColor, getFishShape };