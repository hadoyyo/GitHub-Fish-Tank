require('dotenv').config();

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

async function fetchLanguageStats(username, options = {}) {
  const { excludeForks = true, excludeLanguages = [] } = options;
  
  const cacheKey = `github_languages_${username.toLowerCase()}_${excludeForks ? 'noforks' : 'withforks'}`;
  
  return getCachedOrFetch(cacheKey, async () => {
    const repos = await fetchUserRepos(username);
    
    const reposToAnalyze = repos.filter(repo => {
      if (excludeForks && repo.fork) return false;
      return true;
    });
    
    console.log(`[GITHUB API] Analyzing languages for ${reposToAnalyze.length} repositories...`);
    
    const headers = {
      'User-Agent': 'GitHub-Fish-Tank/1.0',
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    const languageTotals = {};
    
    const batchSize = 10;
    for (let i = 0; i < reposToAnalyze.length; i += batchSize) {
      const batch = reposToAnalyze.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (repo) => {
        try {
          const url = repo.languages_url;
          const response = await fetch(url, { headers });
          
          const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
          const rateLimitReset = response.headers.get('x-ratelimit-reset');
          
          if (rateLimitRemaining) {
            setRateLimitRemaining(parseInt(rateLimitRemaining), parseInt(rateLimitReset));
          }
          
          if (!response.ok) {
            console.warn(`[GITHUB API] Failed to fetch languages for ${repo.name}: ${response.status}`);
            return null;
          }
          
          const languages = await response.json();
          return { repoName: repo.name, languages };
        } catch (error) {
          console.warn(`[GITHUB API] Error fetching languages for ${repo.name}:`, error.message);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach(result => {
        if (!result) return;
        
        Object.entries(result.languages).forEach(([language, bytes]) => {
          if (excludeLanguages.includes(language.toLowerCase())) {
            return;
          }
          
          languageTotals[language] = (languageTotals[language] || 0) + bytes;
        });
      });
      
      if (i + batchSize < reposToAnalyze.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return languageTotals;
  }, 7200);
}

function calculateLanguageStats(languageTotals, options = {}) {
  const { excludeLanguages = [] } = options;
  
  let totalBytes = 0;
  Object.entries(languageTotals).forEach(([lang, bytes]) => {
    if (!excludeLanguages.includes(lang.toLowerCase())) {
      totalBytes += bytes;
    }
  });
  
  const sorted = Object.entries(languageTotals)
    .filter(([lang]) => !excludeLanguages.includes(lang.toLowerCase()))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  
  const result = sorted.map(([lang, bytes]) => ({
    language: lang,
    bytes,
    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
  }));
  
  return result;
}

async function fetchUserLanguageStats(username, options = {}) {
  const languageTotals = await fetchLanguageStats(username, options);
  return calculateLanguageStats(languageTotals, options);
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

module.exports = { 
  fetchUserRepos, 
  fetchUserLanguageStats, 
  calculateLanguageStats, 
  checkRateLimit 
};