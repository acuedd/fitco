import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import {
  setMessages,
  addMessage,
  clearMessages,
} from '../store/slices/messageSlice';
import { messagesService } from '../services/messages.service';

export function useMessages(channelId: number | null) {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.list);

  const fetchMessages = async () => {
    if (!channelId) return;
    const data = await messagesService.getByChannel(channelId);
    dispatch(setMessages(data));
  };

  const sendMessage = async (content: string) => {
    if (!channelId) return;
    const newMessage = await messagesService.send(content, channelId);
    dispatch(addMessage(newMessage));
  };

  useEffect(() => {
    if (channelId) {
      fetchMessages();
    } else {
      dispatch(clearMessages());
    }
  }, [channelId]);

  return {
    messages,
    refetch: fetchMessages,
    sendMessage,
  };
}