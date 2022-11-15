import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  RingProgress,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { useAuth } from '../../services/auth/AuthProvider';
import { Leaderboard } from '../Leaderboard';
import Chat from './Chat';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: 'rgba( 255, 255, 255,0.7 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    width: '60%',
  },
  side: {
    width: '35%',
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100vh',
    backgroundColor: 'rgba( 255, 255, 255,0.7) !important',
  },
}));

type Props = {
  //
};

const Dashboard: React.FC = (props: Props) => {
  const { user } = useAuth();

  const { classes } = useStyles();
  const navigate = useNavigate();

  const handlePlayClicked = () => {
    navigate('/game');
  };

  return (
    <Group>
      <Paper className={classes.main} style={{ paddingBottom: '5rem' }}>
        <Chat />
      </Paper>
      <Stack className={classes.side} justify={'space-between'}>
        <Avatar avatarId={user.avatarId} mx="auto" size={256}>
          {user?.name?.[0].toUpperCase()}
        </Avatar>

        <Stack>
          <Text>You are within the 90th percentile of players!</Text>
          <RingProgress
            label={
              <Text color="grape" weight={700} align="center" size="xl">
                90th percentile!
              </Text>
            }
            size={200}
            thickness={26}
            sections={[{ value: 90, color: 'grape' }]}
            style={{ margin: 'auto' }}
          />
        </Stack>
        <Button size={'xl'} color={'grape'} onClick={handlePlayClicked}>
          Play now
        </Button>
      </Stack>
    </Group>
  );
};

export default Dashboard;
