import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.xpto.ninja/v1',
});

export default api;
