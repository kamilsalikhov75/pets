import axios from 'axios';
import { apiUrl } from './const';

const customAxios = axios.create({
  baseURL: apiUrl,
});

customAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export { customAxios };
