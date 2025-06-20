import api from '../api/axiosInstance';
import type { Channel } from '../store/slices/channelSlice';

export const channelsService = {
  async getByWorkspace(workspaceId: number): Promise<Channel[]> {
    const res = await api.get(`/channels/workspace/${workspaceId}`);
    return res.data;
  },

  async create(workspaceId: number, name: string): Promise<Channel> {
    const res = await api.post('/channels', {
      name,
      isPrivate: false, // default
      workspaceId,
    });
    return res.data;
  },
};