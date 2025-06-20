import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { setChannelList, clearChannels, setCurrentChannel } from '../store/slices/channelSlice';
import { channelsService } from '../services/channels.service';

export function useChannels(workspaceId: number | null) {
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channels.list);
  const selectedChannel = useSelector((state: RootState) => state.channels.current);

  const fetchChannels = async () => {
    if (!workspaceId) return;
    const result = await channelsService.getByWorkspace(workspaceId);
    dispatch(setChannelList(result));
    if (selectedChannel) {
      const updatedChannel = result.find((ch) => ch.id === selectedChannel.id);
      if (updatedChannel) {
        dispatch(setCurrentChannel(updatedChannel));
      }
    }
  };

  const addUserToChannel = async (channelId: number, userId: number) => {
    await channelsService.addUserToChannel(channelId, userId);
    await fetchChannels();
  };

  const removeUserFromChannel = async (channelId: number, userId: number) => {
    await channelsService.removeUserFromChannel(channelId, userId);
    await fetchChannels();
  };

  const selectChannel = async (channelId: number) => {
    const selected = channels.find((ch) => ch.id === channelId);
    if (selected) {
      dispatch(setCurrentChannel(selected));
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchChannels();
    } else {
      dispatch(clearChannels());
    }
  }, [workspaceId]);

  return {
    channels,
    selectedChannel,
    refetch: fetchChannels,
    addUserToChannel,
    removeUserFromChannel,
    selectChannel,
  };
}