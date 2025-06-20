// DashboardPage.tsx
import { Title, Container } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../hooks/useAuth';
import ChannelMessages from '../components/ChannelMessages';
import { useAppSelector } from '../store/hooks';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const selectedChannel = useAppSelector((state) => state.channels.current);

  const mainContent = useMemo(() => {
    return selectedChannel ? (
      <></>
    ) : (
      <Title order={2}>Bienvenido, {user?.name || user?.email} 🎉</Title>
    );
  }, [selectedChannel, user]);

  return (
    <AppLayout>
      <Container>
        {mainContent}
      </Container>
    </AppLayout>
  );
}