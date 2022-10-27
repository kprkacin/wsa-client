import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
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
        toast.success(success);
      }

      return data;
    } catch (e: any) {
      error
        ? toast.error(error)
        : toast.error(e?.response?.data?.title || e?.response?.data?.message);

      throw e;
    }
  };
