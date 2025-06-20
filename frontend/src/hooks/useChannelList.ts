import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useRef } from 'react';
import { channelsService } from '../services/channels.service';
import { type RootState } from '../store';
import { setChannelList, clearChannels } from '../store/slices/channelSlice';

export function useChannelList(workspaceId: number | null) {
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channels.list);
  const prevWorkspaceId = useRef<number | null>(null);

  const fetchChannels = useCallback(async () => {
    if (!workspaceId) return;
    const result = await channelsService.getByWorkspace(workspaceId);
    dispatch(setChannelList(result));
  }, [workspaceId, dispatch]);

  useEffect(() => {
    if (workspaceId && prevWorkspaceId.current !== workspaceId) {
      fetchChannels();
      prevWorkspaceId.current = workspaceId;
    } else if (!workspaceId) {
      dispatch(clearChannels());
    }
  }, [workspaceId, fetchChannels, dispatch]);

  return { channels, refetch: fetchChannels };
}