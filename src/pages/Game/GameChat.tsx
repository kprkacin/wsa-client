import { Button, createStyles, Paper, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TicTacToe } from '../../components';
import { Avatar } from '../../components/Avatar';
import { TextInput } from '../../components/Input';
import { useAuth } from '../../services/auth/AuthProvider';
import { useSocket } from '../../services/socket/SocketProvider';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255, 0.1 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

type Props = {
  //
};

const GameChat: React.FC = (props: Props) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const { classes } = useStyles();
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    socket.on('game.message.received', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('game.message.received');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('game.message.send', { message, id: user.id });
    setMessages((prev) => [...prev, { data: { message, id: user.id } }]);
  };

  console.log(messages);
  return (
    <Paper shadow="xs" radius="xl" p="md" className={classes.main}>
      <Title>Chat</Title>
      {messages.map(({ data }) => (
        <Paper className={classes.main} key={'e'}>
          <Avatar color={'cyan'} size={'lg'}>
            {data?.id}
          </Avatar>
          <Text ml={20} color="black">
            {data?.message}
          </Text>
        </Paper>
      ))}

      <TextInput onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Send</Button>
    </Paper>
  );
};

export default GameChat;

{
  /* 

  <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <Box
          sx={(theme) => ({
            width: '30%',
            height: '200px',
            backgroundColor: 'rgba( 247, 240, 240, 0.1 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 5.5px )',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          })}
        >
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'cyan'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a another message{' '}
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'green',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'blue'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a user message{' '}
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'cyan'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a message{' '}
            </Text>
          </Box>
        </Box>
      </Box>
*/
}
