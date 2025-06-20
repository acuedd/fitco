import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Channel {
  id: number;
  name: string;
  workspaceId: number;
  isPrivate?: boolean;
  members?: number[];
}

interface ChannelState {
  list: Channel[];
  current: Channel | null;
}

const initialState: ChannelState = {
  list: [],
  current: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelList(state, action: PayloadAction<Channel[]>) {
      state.list = action.payload;
    },
    clearChannels(state) {
      state.list = [];
    },
    setCurrentChannel(state, action: PayloadAction<Channel>) {
      state.current = action.payload;
    },
  },
});

export const { setChannelList, clearChannels, setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;