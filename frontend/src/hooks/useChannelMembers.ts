import { useCallback } from 'react';
import { channelsService } from '../services/channels.service';
import { useChannelList } from './useChannelList';
import { useWorkspaces } from './useWorkspaces';

export function useChannelMembership() {
  const { currentWorkspace } = useWorkspaces();
  const { refetch } = useChannelList(currentWorkspace?.id ?? null);

  const addUserToChannel = useCallback(
    async (channelId: number, userId: number) => {
      await channelsService.addUserToChannel(channelId, userId);
      await refetch();
    },
    [refetch]
  );

  const removeUserFromChannel = useCallback(
    async (channelId: number, userId: number) => {
      await channelsService.removeUserFromChannel(channelId, userId);
      await refetch();
    },
    [refetch]
  );

  return {
    addUserToChannel,
    removeUserFromChannel,
  };
}