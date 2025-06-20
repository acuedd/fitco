import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  Text,
  Avatar,
  ScrollArea,
  Divider,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { useChannelMembership } from '../hooks/useChannelMembers'
import { useWorkspaces } from '../hooks/useWorkspaces';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/slices/usersSlice';
import { useSelectedChannel } from '../hooks/useSelectedChannel';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  opened: boolean;
  onClose: () => void;
}

export default function ChannelMembersManager({ opened, onClose }: Props) {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);
  const { currentWorkspace } = useWorkspaces();
  const { addUserToChannel, removeUserFromChannel } = useChannelMembership();
  const { selectedChannel } = useSelectedChannel();

  const channelMembers: User[] = Array.isArray(selectedChannel?.members)
    ? (selectedChannel.members as Array<User | number>)
      .map((member) =>
        typeof member === 'object'
          ? member as User
          : usersState.list.find((u) => u.id === member)
      )
      .filter((u): u is User => !!u)
    : [];

  const memberIds = channelMembers.map((m) => m.id);
  const availableUsers = usersState.list.filter((u) => !memberIds.includes(u.id));

  useEffect(() => {
    let tried = false;

    if (usersState.list.length === 0 && !usersState.loading && !tried) {
      dispatch(fetchUsers());
      tried = true;
    }
  }, []);

  const filteredUsers = availableUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal opened={opened} onClose={onClose} title="Agregar miembros al canal" size="lg">
      <Stack>
        <TextInput
          placeholder="Buscar miembros"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <Divider label="Miembros actuales" />

        <ScrollArea h={150}>
          <Stack>
            {channelMembers.length === 0 ? (
              <Text size="sm" c="dimmed">No hay miembros en este canal.</Text>
            ) : (
              channelMembers.map((user) => (
                <Group key={user.id} justify="space-between">
                  <Group>
                    <Avatar>{user.name[0]}</Avatar>
                    <div>
                      <Text>{user.name}</Text>
                      <Text size="xs" c="dimmed">{user.email}</Text>
                    </div>
                  </Group>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => {
                      if (selectedChannel?.id !== undefined) {
                        removeUserFromChannel(selectedChannel.id, user.id);
                      }
                    }}
                  >
                    Remover
                  </Button>
                </Group>
              ))
            )}
          </Stack>
        </ScrollArea>

        <Divider label="Miembros disponibles" />

        <ScrollArea h={300}>
          <Stack>
            {filteredUsers.map((user) => (
              <Group key={user.id} justify="space-between">
                <Group>
                  <Avatar>{user.name[0]}</Avatar>
                  <div>
                    <Text>{user.name}</Text>
                    <Text size="xs" c="dimmed">{user.email}</Text>
                  </div>
                </Group>
                <Button
                  size="xs"
                  onClick={() => {
                    if (selectedChannel?.id !== undefined) {
                      addUserToChannel(selectedChannel.id, user.id);
                    }
                  }}
                >
                  Añadir
                </Button>
              </Group>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Modal>
  );
}