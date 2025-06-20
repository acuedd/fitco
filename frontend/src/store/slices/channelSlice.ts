import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Channel {
  id: number;
  name: string;
  workspaceId: number;
}

interface ChannelState {
  list: Channel[];
}

const initialState: ChannelState = {
  list: [],
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
  },
});

export const { setChannelList, clearChannels } = channelSlice.actions;
export default channelSlice.reducer;