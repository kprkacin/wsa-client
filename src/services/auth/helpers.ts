import axios from 'axios';
import { api } from '../api/api';

export const setAccessToken = (token: string) => {
  api.defaults.headers.common.Authorization = 'Bearer ' + token;
  localStorage.setItem('token', token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAccessToken = () => {
  axios.defaults.headers.common.Authorization = null;
  localStorage.removeItem('token');
};
