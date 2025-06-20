import { Title, Container } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <AppLayout>
      <Container>
        <Title order={2}>Bienvenido, {user?.name || user?.email} 🎉</Title>
        <p>Esta es tu área personal de DevTalk.</p>
      </Container>
    </AppLayout>
  );
}