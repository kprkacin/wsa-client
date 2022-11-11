import axios, { AxiosRequestConfig } from 'axios';
import { showNotification } from '@mantine/notifications';
import { ToastSettings } from './types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const createApiCall =
  (config: AxiosRequestConfig, toastSettings?: ToastSettings | null) =>
  async () => {
    if (!toastSettings) {
      return api(config);
    }

    console.log(import.meta.env.VITE_API_URL);
    const { success, error } = toastSettings;

    try {
      const data = await api(config);
      if (success) {
        showNotification({ message: success, color: 'teal' });
      }

      return data;
    } catch (e: any) {
      showNotification({
        message: error || 'Error. Please try again',
        color: 'red',
      });

      throw e;
    }
  };
