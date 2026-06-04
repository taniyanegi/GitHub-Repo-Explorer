import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

export async function getUser(username) {
  const response = await api.get(`/user/${username}`);
  return response.data;
}

export async function getUserRepos(username, page = 1) {
  const response = await api.get(`/user/${username}/repos`, {
    params: { page }
  });
  return response.data;
}