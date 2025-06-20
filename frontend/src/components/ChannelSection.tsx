import {
  Divider,
  Loader,
  NavLink,
  Stack,
  Modal,
  TextInput,
  Group,
  ActionIcon,
  Tooltip,
  Button,
} from '@mantine/core';
import { IconMessageCircle2, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { channelsService } from '../services/channels.service';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useChannelList } from '../hooks/useChannelList';
import { useSelectedChannel } from '../hooks/useSelectedChannel';

export function ChannelSection() {
  const { currentWorkspace } = useWorkspaces();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.user?.userId);

  const { channels, refetch } = useChannelList(currentWorkspace?.id ?? null);
  const { selectChannel } = useSelectedChannel();

  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!currentWorkspace || !name.trim()) return;
    setCreating(true);
    try {
      await channelsService.create(currentWorkspace.id, name.trim());
      setName('');
      setOpened(false);
      await refetch();
    } catch (err) {
      console.error('Error al crear canal', err);
    } finally {
      setCreating(false);
    }
  };

  const userChannels = channels.filter((ch) => {
    const members = ch.members ?? [];
    return members.some((m: { id?: number } | number) =>
      typeof m === 'number' ? m === userId : m?.id === userId
    );
  });

  return (
    <Stack gap="xs" mt="md">
      <Group justify="space-between">
        <Divider label="Canales" />
        <Tooltip label="Crear canal" withArrow>
          <ActionIcon variant="subtle" onClick={() => setOpened(true)}>
            <IconPlus size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {currentWorkspace ? (
        userChannels.length === 0 ? (
          <Loader size="sm" />
        ) : (
          userChannels.map((channel) => (
            <NavLink
              key={channel.id}
              label={`# ${channel.name}`}
              leftSection={<IconMessageCircle2 size={16} />}
              onClick={() => selectChannel(channel.id)}
            />
          ))
        )
      ) : (
        <TextInput disabled placeholder="Selecciona un workspace" />
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Nuevo canal"
        centered
      >
        <Stack>
          <TextInput
            label="Nombre del canal"
            placeholder="ej. desarrollo"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button loading={creating} onClick={handleCreate}>
            Crear
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}