const cache = new Map();
const TTL = 60 * 1000;

function getCache(key) {
  const entry = cache.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache(key, data) {
  cache.set(key, {
    data: data,
    timestamp: Date.now()
  });
}

module.exports = { getCache, setCache };