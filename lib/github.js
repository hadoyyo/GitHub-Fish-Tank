const fetch = require('node-fetch');
const { getCachedOrFetch, setRateLimitRemaining } = require('./cache');

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';


async function fetchUserRepos(username) {
  const cacheKey = `github_repos_${username.toLowerCase()}`;
  
  return getCachedOrFetch(cacheKey, async () => {
    let allRepos = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;
    
    while (hasMore && page <= 5) {
      const url = `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&page=${page}&sort=pushed`;
      
      const headers = {
        'User-Agent': 'GitHub-Fish-Tank/1.0',
        'Accept': 'application/vnd.github.v3+json'
      };
      
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      }
      
      const response = await fetch(url, { headers });
      
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      
      if (rateLimitRemaining) {
        setRateLimitRemaining(parseInt(rateLimitRemaining), parseInt(rateLimitReset));
        console.log(`[GITHUB API] Rate limit remaining: ${rateLimitRemaining}`);
      }
      
      if (response.status === 403 && rateLimitRemaining === '0') {
        const resetDate = new Date(rateLimitReset * 1000);
        throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`);
      }
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${username}" not found`);
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos = await response.json();
      
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(repos);
        page++;
      }
      
      if (repos.length < perPage) {
        hasMore = false;
      }
    }
    
    return allRepos;
  }, 3600);
}

function calculateLanguageStats(repos, options = {}) {
  const { excludeForks = true, excludeLanguages = [] } = options;
  
  const stats = {};
  let totalBytes = 0;
  
  repos.forEach(repo => {
    if (excludeForks && repo.fork) return;
    
    if (!repo.language) return;
    if (excludeLanguages.includes(repo.language.toLowerCase())) return;
    
    const size = repo.size || 0;
    stats[repo.language] = (stats[repo.language] || 0) + size;
    totalBytes += size;
  });
  
  const sorted = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // max 8 
    
  const result = sorted.map(([lang, bytes]) => ({
    language: lang,
    bytes,
    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
  }));
  
  return result;
}

async function checkRateLimit() {
  const url = `${GITHUB_API}/rate_limit`;
  const headers = {
    'User-Agent': 'GitHub-Fish-Tank/1.0',
    'Accept': 'application/vnd.github.v3+json'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  const response = await fetch(url, { headers });
  const data = await response.json();
  
  return {
    remaining: data.resources.core.remaining,
    limit: data.resources.core.limit,
    reset: new Date(data.resources.core.reset * 1000).toISOString()
  };
}

module.exports = { fetchUserRepos, calculateLanguageStats, checkRateLimit };