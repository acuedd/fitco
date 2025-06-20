import { Tabs, rem, Container, Center, Paper } from '@mantine/core';
import { IconUser, IconLock } from '@tabler/icons-react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function LoginPage() {
  return (
    <Center h="100vh">
      <Container size="xs">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Tabs defaultValue="login" variant="outline">
            <Tabs.List grow>
              <Tabs.Tab
                value="login"
                leftSection={<IconLock size={rem(16)} />}
              >
                Iniciar sesión
              </Tabs.Tab>
              <Tabs.Tab
                value="register"
                leftSection={<IconUser size={rem(16)} />}
              >
                Registrarse
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login" pt="md">
              <LoginForm />
            </Tabs.Panel>

            <Tabs.Panel value="register" pt="md">
              <RegisterForm />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>
    </Center>
  );
}