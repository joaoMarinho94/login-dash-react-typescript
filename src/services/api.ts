import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.xpto.ninja/v1',
  headers: {
    Accept: 'application/json',
  },
});

export default api;
