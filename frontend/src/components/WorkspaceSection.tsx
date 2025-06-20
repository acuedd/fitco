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
import { IconBuildingCommunity, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { workspacesService } from '../services/workspaces.service';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { useSelectedChannel } from '../hooks/useSelectedChannel';

export function WorkspaceSection() {
  const {
    workspaces,
    currentWorkspace,
    setCurrent,
    refetch,
  } = useWorkspaces();

  const { clearSelectedChannel } = useSelectedChannel();

  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await workspacesService.create(name.trim());
      setName('');
      setOpened(false);
      await refetch();
    } catch (error) {
      console.error('Error al crear workspace:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Stack gap="xs" mt="md">
      <Group justify="space-between">
        <Divider label="Workspaces" />
        <Tooltip label="Crear nuevo workspace" withArrow>
          <ActionIcon variant="subtle" onClick={() => setOpened(true)}>
            <IconPlus size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {workspaces.length === 0 ? (
        <Loader size="sm" />
      ) : (
        workspaces.map((ws) => (
          <NavLink
            key={ws.id}
            label={ws.name}
            leftSection={<IconBuildingCommunity size={16} />}
            active={currentWorkspace?.id === ws.id}
            onClick={async () => {
              clearSelectedChannel();
              await setCurrent(ws.id);
            }}
          />
        ))
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Crear nuevo workspace"
        centered
      >
        <Stack>
          <TextInput
            label="Nombre del workspace"
            placeholder="Ej. Proyecto X"
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