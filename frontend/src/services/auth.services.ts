import api from '../api/axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export const authService = {
  async register(payload: RegisterPayload): Promise<void> {
    await api.post('/auth/register', payload);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getProfile(): Promise<AuthResponse['user']> {
    const response = await api.post<AuthResponse['user']>('/auth/profile');
    return response.data;
  },

  async refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data;
  },
};