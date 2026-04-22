const { fetchUserRepos, calculateLanguageStats } = require('../lib/github');
const { generateAquariumSVG } = require('../lib/renderer');

export default async function handler(req, res) {
  try {
    const { 
      user, 
      bg = '0a192f',
      frame = '3a4a5a',
      sand = 'C4A574', 
      hide = '',
      show_legend = 'true',
      show_decorations = 'true',
      show_bubbles = 'true',
      show_rocks = 'true',
      show_plants = 'true',
      show_castle = 'true',
      show_chest = 'true',
      show_shell = 'true',
      show_frame = 'false',
      shape_map = '{}'
    } = req.query;
    
    if (!user) {
      return res.status(400).send('Missing "user" parameter');
    }
    
    const excludeLanguages = hide.split(',').map(l => l.trim().toLowerCase()).filter(Boolean);
    let shapePreference = {};
    try {
      shapePreference = JSON.parse(decodeURIComponent(shape_map));
    } catch (e) {
      // ignore
    }
    
    const bgColor = bg.startsWith('#') ? bg : `#${bg}`;
    const showLegend = show_legend === 'true';
    const showDecorations = show_decorations === 'true';
    const showBubbles = show_bubbles === 'true';
    const showRocks = show_rocks === 'true';
    const showPlants = show_plants === 'true';
    const showCastle = show_castle === 'true';
    const showChest = show_chest === 'true';
    const showShell = show_shell === 'true';
    const showFrame = show_frame === 'true';
    
    const repos = await fetchUserRepos(user);
    
    const languageStats = calculateLanguageStats(repos, { 
      excludeLanguages,
      excludeForks: true 
    });
    
    if (languageStats.length === 0) {
      const emptySVG = `
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bgColor}" />
          <text x="400" y="200" text-anchor="middle" fill="#8899aa" font-size="20" font-family="monospace">
            No language data found for @${user}
          </text>
        </svg>
      `;
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      return res.send(emptySVG);
    }
    
    const svg = generateAquariumSVG(languageStats, {
      bgColor,
      frameColor,
      sandColor,
      showLegend,
      showDecorations,
      showBubbles,
      showRocks,
      showPlants,
      showCastle,
      showChest,
      showShell,
      showFrame,
      shapePreference
    });
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-RateLimit-Remaining', 'See GitHub API');
    
    res.send(svg);
    
  } catch (error) {
    console.error('[API Error]', error);
    
    const errorSVG = `
      <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a2e" />
        <text x="400" y="100" text-anchor="middle" fill="#ff6b6b" font-size="16" font-family="monospace">
          Error: ${escapeXml(error.message)}
        </text>
        <text x="400" y="130" text-anchor="middle" fill="#8899aa" font-size="12" font-family="monospace">
          Please check the username or try again later
        </text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(500).send(errorSVG);
  }
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
