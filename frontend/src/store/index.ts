import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workspaceReducer from './slices/workspaceSlice';
import channelReducer from './slices/channelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces: workspaceReducer,
    channels: channelReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;