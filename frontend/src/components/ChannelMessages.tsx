import { useEffect, useRef, useState } from 'react';
import { Box, Button, Group, Stack, TextInput, Text, Paper, ScrollArea } from '@mantine/core';
import { useMessages } from '../hooks/useMessages';
import { useAppSelector, useAppDispatch } from '../store/hooks';

export default function ChannelMessages({ channelId }: { channelId: number }) {
  const { messages, sendMessage } = useMessages(channelId);
  const user = useAppSelector((state) => state.auth.user);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <Stack h="100%" justify="space-between" p="md" style={{ height: 'calc(100vh - 60px)' }}>
      <ScrollArea offsetScrollbars style={{ flexGrow: 1 }}>
        <Stack>
          {messages.map((msg) => (
            <Paper key={msg.id} p="xs" radius="md" withBorder>
              <Text size="sm" fw={500}>{msg.userId === user?.id ? 'Yo' : `Usuario ${msg.userId}`}</Text>
              <Text size="sm">{msg.content}</Text>
            </Paper>
          ))}
          <div ref={scrollRef} />
        </Stack>
      </ScrollArea>

      <Group mt="md">
        <TextInput
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Escribe tu mensaje..."
          style={{ flexGrow: 1 }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Enviar</Button>
      </Group>
    </Stack>
  );
}