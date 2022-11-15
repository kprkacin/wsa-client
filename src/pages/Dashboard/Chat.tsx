import {
  Button,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TicTacToe } from '../../components';
import { Avatar } from '../../components/Avatar';
import { ChatMessage } from '../../components/Chat';
import { TextInput } from '../../components/Input';
import { useAuth } from '../../services/auth/AuthProvider';
import { useSocket } from '../../services/socket/SocketProvider';

const useStyles = createStyles((theme) => ({}));

type Props = {
  //
};

const Chat: React.FC = (props: Props) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const { classes } = useStyles();
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    socket.on('lobby.message.received', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('lobby.message.received');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('lobby.message.send', { message, id: user.id });
    setMessages((prev) => [...prev, { data: { message, id: user.id } }]);
  };

  console.log(messages);
  return (
    <Paper p="md" style={{ backgroundColor: 'transparent', height: '100vh' }}>
      <Stack justify={'space-between'} style={{ height: '100vh' }}>
        <Stack>
          <Title weight="700" size="h1" color="gray.6" transform="uppercase">
            Lobby
          </Title>
          {messages.map(({ data }, idx) => (
            <ChatMessage key={idx} message={data.message} id={data.id} />
          ))}
        </Stack>
        <Group
          style={{ marginBottom: '3rem', width: '100% ', marginTop: '3rem' }}
        >
          <Textarea
            placeholder="Enter message"
            radius="lg"
            style={{ width: '70%' }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            color="grape"
            variant="outline"
            radius="md"
            style={{ width: '25%' }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export default Chat;
