import axios from 'axios';

const API_URL = 'http://localhost:5000'; // 서버 URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // 인증 토큰을 로컬 스토리지에서 가져옴
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
