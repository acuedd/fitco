// src/components/ChannelMembersManager.tsx
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
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/slices/usersSlice';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
  opened: boolean;
  onClose: () => void;
  onAdd: (userId: number) => void;
}

export default function ChannelMembersManager({ users, opened, onClose, onAdd }: Props) {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);

  useEffect(() => {
    let tried = false;

    if (usersState.list.length === 0 && !usersState.loading && !tried) {
      dispatch(fetchUsers());
      tried = true;
    }
  }, []); // Empty dependency array to ensure it only runs once on mount

  const filteredUsers = users.filter((u) =>
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
                <Button size="xs" onClick={() => onAdd(user.id)}>
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