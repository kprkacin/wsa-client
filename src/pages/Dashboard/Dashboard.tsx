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

  const ths = (
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Losses</th>
    </tr>
  );

  const rows = [...Array(50)].map((element, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{Math.random().toString(32).slice(2)}</td>
      <td>{Math.ceil(Math.random() * 100)}</td>
      <td>{Math.ceil(Math.random() * 100)}</td>
    </tr>
  ));
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
      <Leaderboard />
    </>
  );
};

export default Dashboard;
