import {
  AppShell,
  AppShellNavbar,
  AppShellHeader,
  AppShellMain,
  Burger,
  Group,
  Text,
  NavLink,
  Avatar,
  Stack,
  ScrollArea,
  Divider,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconLogout,
  IconMessageCircle2,
  IconUsers,
  IconBuildingCommunity,
} from '@tabler/icons-react';
import { WorkspaceSection } from './WorkspaceSection';
import { ChannelSection } from './ChannelSection';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkspaces } from '../hooks/useWorkspaces';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentWorkspace } = useWorkspaces();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader px="md">
        <Group h="100%" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700}>DevTalk</Text>
          </Group>

          {user && (
            <Group gap="xs">
              <Avatar radius="xl">{user.name?.charAt(0).toUpperCase() || user.email?.charAt(0)}</Avatar>
              <div>
                <Text size="sm">{user.name || user.email}</Text>
                {currentWorkspace && (
                  <Text size="xs" c="dimmed">
                    {currentWorkspace.name}
                  </Text>
                )}
              </div>
            </Group>
          )}
        </Group>
      </AppShellHeader>

      <AppShellNavbar p="md">
        <ScrollArea h="100%">
          <Stack gap="xs">
            <NavLink
              label="Dashboard"
              active={location.pathname === '/dashboard'}
              leftSection={<IconHome size={16} />}
              onClick={() => navigate('/dashboard')}
            />

            <WorkspaceSection />

            <ChannelSection />
            <Divider my="sm" />

            <Divider label="Usuarios" my="xs" />
            <NavLink
              label="Usuarios"
              leftSection={<IconUsers size={16} />}
              onClick={() => navigate('/users')}
            />

            <NavLink
              label="Cerrar sesión"
              leftSection={<IconLogout size={16} />}
              onClick={logout}
              color="red"
            />
          </Stack>
        </ScrollArea>
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}