import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import workspaceReducer from './slices/workspaceSlice';
import channelReducer from './slices/channelSlice';
import messageReducer from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    workspaces: workspaceReducer,
    channels: channelReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;