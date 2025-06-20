import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Workspace {
  id: number;
  name: string;
}

interface WorkspaceState {
  current: Workspace | null;
  list: Workspace[];
}

const initialState: WorkspaceState = {
  current: null,
  list: [],
};

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setCurrentWorkspace(state, action: PayloadAction<Workspace>) {
      state.current = action.payload;
    },
    setWorkspaceList(state, action: PayloadAction<Workspace[]>) {
      state.list = action.payload;
    },
    clearWorkspace(state) {
      state.current = null;
    },
  },
});

export const {
  setCurrentWorkspace,
  setWorkspaceList,
  clearWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;