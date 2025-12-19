const REPO_OWNER = 'Goochbeater';
const REPO_NAME = 'Spiritual-Spell-Red-Teaming';
const BRANCH = 'main';

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchRepoContents(path = '') {
  // Clean path
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const cacheKey = `repo_cache_${cleanPath}`;

  // Try cache first
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (e) {
    // Ignore cache errors
  }

  try {
    // For listing directories, we must use the API
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`);

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        // Rate limited - try to return stale cache if we have it
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          return JSON.parse(cached).data;
        }
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    // Save to cache
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));

    return data;
  } catch (error) {
    console.error('Error fetching repo contents:', error);
    throw error;
  }
}

export async function fetchRawFile(path) {
  // For file content, use the raw.githubusercontent.com domain to avoid API rate limits
  const cleanPath = path.replace(/^\/+/, '');
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${cleanPath}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
    return await res.text();
  } catch (error) {
    console.error('Error fetching raw file:', error);
    throw error;
  }
}
