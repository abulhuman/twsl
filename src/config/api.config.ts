import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:7000/api/v1'
});

export default api;

