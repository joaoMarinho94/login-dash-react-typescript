import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.xpto.ninja/v1',
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(config => {
  const userSessionStorage = sessionStorage.getItem('user');
  const userLocalStorage = localStorage.getItem('user');
  let user = null;

  if (userSessionStorage) user = JSON.parse(userSessionStorage);
  else if (userLocalStorage) user = JSON.parse(userLocalStorage);

  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
