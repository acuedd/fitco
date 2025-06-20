import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import { setCurrentChannel } from '../store/slices/channelSlice';

export function useSelectedChannel() {
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state: RootState) => state.channels.current);
  const channels = useSelector((state: RootState) => state.channels.list);

  const selectChannel = (channelId: number) => {
    const selected = channels.find((ch) => ch.id === channelId);
    if (selected) {
      dispatch(setCurrentChannel(selected));
    }
  };

  const clearSelectedChannel = () => {
    dispatch(setCurrentChannel(null));
  };

  return {
    selectedChannel,
    selectChannel,
    clearSelectedChannel,
  };
}