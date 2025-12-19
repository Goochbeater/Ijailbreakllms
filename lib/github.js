const REPO_OWNER = 'Goochbeater';
const REPO_NAME = 'Spiritual-Spell-Red-Teaming';
const BRANCH = 'main';

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchRepoContents(path = '') {
  // Clean path
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const cacheKey = `repo_cache_${cleanPath}`;

  console.log(`[GitHub] Fetching contents for path: "${cleanPath}"`);

  // Try cache first
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log(`[GitHub] Cache hit for "${cleanPath}"`);
        return data;
      }
    }
  } catch (e) {
    console.warn('[GitHub] Cache read error:', e);
  }

  try {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`;
    console.log(`[GitHub] Fetching from API: ${url}`);

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[GitHub] API Error: ${res.status} ${res.statusText}`);
      if (res.status === 403 || res.status === 429) {
        // Rate limited - try to return stale cache if we have it
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          console.warn('[GitHub] Rate limited, returning stale cache');
          return JSON.parse(cached).data;
        }
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    console.log(`[GitHub] API Success. Items: ${Array.isArray(data) ? data.length : 'file'}`);

    // Save to cache
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('[GitHub] Cache write error:', e);
    }

    return data;
  } catch (error) {
    console.error('[GitHub] Fetch error:', error);
    throw error;
  }
}

export async function fetchRawFile(path) {
  // For file content, use the raw.githubusercontent.com domain to avoid API rate limits
  const cleanPath = path.replace(/^\/+/, '');
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${cleanPath}`;

  console.log(`[GitHub] Fetching raw file: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
    return await res.text();
  } catch (error) {
    console.error('[GitHub] Raw file error:', error);
    throw error;
  }
}
