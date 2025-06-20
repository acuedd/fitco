import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { setChannelList, clearChannels } from '../store/slices/channelSlice';
import { channelsService } from '../services/channels.service';

export function useChannels(workspaceId: number | null) {
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channels.list);

  const fetchChannels = async () => {
    if (!workspaceId) return;
    const result = await channelsService.getByWorkspace(workspaceId);
    dispatch(setChannelList(result));
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
    refetch: fetchChannels,
  };
}