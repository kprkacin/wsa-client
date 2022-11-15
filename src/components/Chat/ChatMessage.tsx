import { createStyles, Group, Paper, Text } from '@mantine/core';
import { Avatar } from '../Avatar';
import React, { useEffect, useState } from 'react';
import { User } from '../../services/users';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255,1 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    padding: '1rem 0.5rem',
    width: '100%',
  },
}));

interface MessageProps {
  message: string;
  id: string;
}

const ChatMessage: React.FC<MessageProps> = (props) => {
  const { message, id } = props;

  const [messageUser, setMessageUser] = useState<User | null>(null);
  const { classes } = useStyles();
  const { getUser } = useUserMiddleware();

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser(id);
        setMessageUser(user);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    <Paper className={classes.main} key={'e'}>
      <Group>
        <Avatar
          color={'cyan'}
          size={'lg'}
          avatarId={messageUser?.avatarId}
        ></Avatar>
        <Text color={'cyan'}>{messageUser?.name}</Text>
      </Group>
      <Text color="black" align="start" ml={'25%'}>
        {message}
      </Text>
    </Paper>
  );
};

export default ChatMessage;
