import { createStyles, Paper, Text } from '@mantine/core';
import { Avatar } from '../Avatar';
import React, { useEffect, useState } from 'react';
import { User } from '../../services/users';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255, 0.1 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
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
      <Avatar color={'cyan'} size={'lg'}>
        {messageUser?.name}
      </Avatar>
      <Text ml={20} color="black">
        {message}
      </Text>
    </Paper>
  );
};

export default ChatMessage;
