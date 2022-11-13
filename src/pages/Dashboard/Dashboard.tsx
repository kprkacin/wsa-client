import { Box, createStyles, Table, Text } from '@mantine/core';
import React from 'react';
import { Avatar } from '../../components/Avatar';
import { useAuth } from '../../services/auth/AuthProvider';
import { Leaderboard } from '../Leaderboard';
import Chat from './Chat';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: 'pink',
  },
}));

type Props = {
  //
};

const Dashboard: React.FC = (props: Props) => {
  const { user } = useAuth();

  const { classes } = useStyles();

  return (
    <>
      <Text>Welcome Dashboard {user.name} </Text>
      <Box
        sx={{
          width: '30%',
        }}
      >
        <Chat />
      </Box>
    </>
  );
};

export default Dashboard;
