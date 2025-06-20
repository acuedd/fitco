import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (err: AxiosError) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Explicitly type the state to avoid 'unknown' error
    const state = store.getState() as { auth: { accessToken?: string } };
    const { auth } = state;
    const token = auth.accessToken;

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalRequest: any = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(error => Promise.reject(error));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const state = store.getState() as { auth: { refreshToken?: string } };
        const refreshToken = state.auth.refreshToken;

        const response = await api.post('/auth/refresh', { refreshToken });

        const newToken = response.data.accessToken;

        store.dispatch({
          type: 'auth/setCredentials',
          payload: { accessToken: newToken },
        });

        failedQueue.forEach(prom => prom.resolve(newToken));
        failedQueue = [];

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        failedQueue.forEach(prom => prom.reject(err as AxiosError));
        failedQueue = [];

        store.dispatch({ type: 'auth/logout' });
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;