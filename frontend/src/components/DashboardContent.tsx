// DashboardContent.tsx o dentro de DashboardPage.tsx
import { Title, Container } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';
import ChannelMessages from '../components/ChannelMessages';
import type { Channel } from '../types/channel';

type Props = {
  channels: Channel[];
  selectedChannel: Channel | null;
  selectChannel: (id: number) => void;
  refetch: () => void;
};

export function DashboardContent({ selectedChannel }: Props) {
  const { user } = useAuth();

  return (
    <Container>
      {!selectedChannel && (
        <Title order={2}>Bienvenido, {user?.name || user?.email} 🎉</Title>
      )}
      {selectedChannel && (
        <ChannelMessages channelId={selectedChannel.id} />
      )}
    </Container>
  );
}