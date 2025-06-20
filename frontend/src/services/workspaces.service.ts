import api from '../api/axiosInstance';

export interface Workspace {
  id: number;
  name: string;
}

export const workspacesService = {
  async getAll(): Promise<Workspace[]> {
    const response = await api.get('/workspaces');
    return response.data;
  },

  async create(name: string): Promise<Workspace> {
    const response = await api.post('/workspaces', { name });
    return response.data;
  },
};