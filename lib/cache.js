const cache = new Map();

/**
 * @param {string} key
 * @param {Function} fetcher
 * @param {number} ttlSeconds
 */
async function getCachedOrFetch(key, fetcher, ttlSeconds = 3600) {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && cached.expiresAt > now) {
    console.log(`[CACHE HIT] ${key}`);
    return cached.data;
  }
  
  console.log(`[CACHE MISS] ${key} - fetching fresh data`);
  const data = await fetcher();
  
  cache.set(key, {
    data,
    expiresAt: now + (ttlSeconds * 1000)
  });

  if (cache.size > 100) {
    for (const [k, v] of cache.entries()) {
      if (v.expiresAt <= now) {
        cache.delete(k);
      }
    }
  }
  
  return data;
}

function getRateLimitRemaining() {
  const key = 'github_rate_limit_remaining';
  return cache.get(key)?.data || null;
}

function setRateLimitRemaining(remaining, resetTime) {
  const key = 'github_rate_limit_remaining';
  cache.set(key, {
    data: { remaining, resetTime },
    expiresAt: resetTime * 1000
  });
}

module.exports = { getCachedOrFetch, getRateLimitRemaining, setRateLimitRemaining };