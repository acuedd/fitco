import { Title, Container } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../hooks/useAuth';
import ChannelMessages from '../components/ChannelMessages';
import { useAppSelector } from '../store/hooks';

export default function DashboardPage() {
  const { user } = useAuth();
  const currentChannel = useAppSelector((state) => state.channels.list[0]);

  return (
    <AppLayout>
      <Container>
        <Title order={2}>Bienvenido, {user?.name || user?.email} 🎉</Title>
        {currentChannel && (
          <ChannelMessages channelId={currentChannel.id} />
        )}
      </Container>
    </AppLayout>
  );
}