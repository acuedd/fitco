import { Title, Button } from '@mantine/core';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <Title order={2}>Hola, {user?.username} 👋</Title>
      <Button mt="md" onClick={logout}>Cerrar sesión</Button>
    </div>
  );
}