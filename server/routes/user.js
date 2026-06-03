const express = require('express');
const router = express.Router();
const { fetchUser, fetchRepos } = require('../services/githubService');
const { getCache, setCache } = require('../cache');

function isValidUsername(username) {
  return username && /^[a-zA-Z0-9\-]{1,39}$/.test(username);
}

// GET /api/user/:username
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  if (!isValidUsername(username)) {
    return res.status(400).json({ error: 'Invalid GitHub username format.' });
  }

  const cacheKey = `user_${username}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  try {
    const user = await fetchUser(username);

    const data = {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      html_url: user.html_url,
      location: user.location
    };

    setCache(cacheKey, data);
    res.json({ ...data, fromCache: false });

  } catch (error) {
    handleGitHubError(error, res);
  }
});

// GET /api/user/:username/repos?page=1
router.get('/user/:username/repos', async (req, res) => {
  const { username } = req.params;

  if (!isValidUsername(username)) {
    return res.status(400).json({ error: 'Invalid GitHub username format.' });
  }

  const page = parseInt(req.query.page) || 1;
  const sort = ['stars', 'name', 'updated'].includes(req.query.sort) ? req.query.sort : 'updated';
  const cacheKey = `repos_${username}_page${page}_sort${sort}`;


  const cached = getCache(cacheKey);
  if (cached) {
    return res.json({ repos: cached, fromCache: true });
  }

  try {
    const repos = await fetchRepos(username, page, sort);

    const simplified = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      open_issues_count: repo.open_issues_count,
      default_branch: repo.default_branch,
      forks_count: repo.forks_count
    }));

    setCache(cacheKey, simplified);
    res.json({ repos: simplified, hasMore: repos.length === 30, fromCache: false });

  } catch (error) {
    handleGitHubError(error, res);
  }
});

function handleGitHubError(error, res) {
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      return res.status(404).json({ error: 'GitHub user not found' });
    }
    if (status === 403) {
      return res.status(429).json({ error: 'GitHub rate limit exceeded. Try again later.' });
    }
    if (status === 401) {
      return res.status(401).json({ error: 'GitHub authentication failed. Check your token.' });
    }
  }
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

module.exports = router;
