import api from '../api/axiosInstance';
import type { Message } from '../store/slices/messageSlice';

export const messagesService = {
  async getByChannel(channelId: number): Promise<Message[]> {
    const res = await api.get(`/messages/channel/${channelId}`);
    return res.data;
  },

  async send(content: string, channelId: number): Promise<Message> {
    const res = await api.post('/messages', { content, channelId });
    return res.data;
  },
};