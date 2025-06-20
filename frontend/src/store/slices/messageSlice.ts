import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: number;
  content: string;
  channelId: number;
  userId: number;
  createdAt: string;
}

interface MessageState {
  list: Message[];
}

const initialState: MessageState = {
  list: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.list = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.list.push(action.payload);
    },
    clearMessages(state) {
      state.list = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;