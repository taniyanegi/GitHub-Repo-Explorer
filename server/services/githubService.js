const axios = require('axios');

const GITHUB_BASE = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  })
};

async function fetchUser(username) {
  const response = await axios.get(
    `${GITHUB_BASE}/users/${username}`,
    { headers }
  );
  return response.data;
}

async function fetchRepos(username, page = 1, sort = 'updated') {
  const response = await axios.get(
    `${GITHUB_BASE}/users/${username}/repos`,
    {
      headers,
      params: {
        per_page: 30,
        page: page,
        sort: sort
      }
    }
  );
  return response.data;
}

module.exports = { fetchUser, fetchRepos };
