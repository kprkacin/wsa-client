import {
  Box,
  createStyles,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconAt } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { PasswordInput, TextInput } from '../../components/Input';
import { ReplayModal } from '../../components/Replay';
import { LastPlayedRow } from '../../components/Table';
import { useAuth } from '../../services/auth/AuthProvider';
import { getRankByUserId, Rank } from '../../services/ranks';
import { initialRank } from '../../services/ranks/consts';
import { getResultsByUserId, Result } from '../../services/results';
import { initialUser, User } from '../../services/users';
import { getUserById } from '../../services/users/api';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';
import { Leaderboard } from '../Leaderboard';
const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255,0.7 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    width: '45%',
  },
  side: {
    backgroundColor: ' rgba( 255, 255, 255,0.7 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    width: '100%',
    maxHeight: '45vh',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '16px',
    marginTop: '2rem',
    //backgroundColor: 'white',
    border: 0,
    'tbody tr td': {
      borderBottom: 0,
      padding: '1rem 0rem',
    },
  },

  stack: {
    justifyContent: 'space-between',
  },
  groups: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  boxWin: {
    minWidth: '200px',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.green[3],
  },
  boxLoss: {
    minWidth: '200px',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.red[3],
  },
}));

type Props = {
  //
};

const Profile: React.FC = (props: Props) => {
  const { classes } = useStyles();
  const [rank, setRank] = useState<Rank>(initialRank);
  const [user, setUser] = useState<User>(initialUser);
  const [results, setResults] = useState<Result[]>([]);
  const [activeReplay, setActiveReplay] = useState<string | null>(null);

  const { id } = useParams();
  const { getUser } = useUserMiddleware();
  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const userData = await getUser(id);
          if (userData) {
            setUser(userData);
          }
          const userRank = await getRankByUserId(id);
          setRank(userRank);
          const userResults = await getResultsByUserId(id);
          setResults(userResults);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const handleModalOpen = (replayId: string) => {
    setActiveReplay(replayId);
  };

  const ths = (
    <tr>
      <th>Num</th>
      <th>Player X</th>
      <th>Player O</th>
      <th>Winner</th>
    </tr>
  );

  const rows = results.map((element, index) => (
    <tr key={index}>
      <LastPlayedRow
        result={element}
        index={index}
        setActiveReplay={handleModalOpen}
      />
    </tr>
  ));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '35px',
        }}
      >
        <Paper shadow="xs" radius="xl" p="md" className={classes.main}>
          <Avatar m="auto" size={256}>
            {user?.name?.[0].toUpperCase()}
          </Avatar>

          <TextInput
            label="Name"
            value={user.name || ''}
            name="username"
            //onChange={handleChange}
            //error={errors.username}
            disabled
            p={8}
          />

          <TextInput
            label="Email"
            value={user.email || ''}
            name="email"
            icon={<IconAt />}
            // onChange={handleChange}
            //error={errors.email}
            disabled
            p={8}
          />
        </Paper>
        <Stack style={{ width: '45%' }}>
          <Paper shadow="xs" radius="xl" p="md" className={classes.side}>
            <Stack className={classes.stack}>
              <Title>Your Stats</Title>
              <Group className={classes.groups}>
                <Box className={classes.boxWin}>
                  <Text color={'white'}>Wins</Text>
                  <Text size={96} color={'white'}>
                    {rank.wins}
                  </Text>
                </Box>
                <Box className={classes.boxLoss}>
                  <Text color={'white'}>Losses</Text>
                  <Text size={96} color={'white'}>
                    {rank.losses}
                  </Text>
                </Box>
              </Group>
            </Stack>
          </Paper>
          <Paper shadow="xs" radius="xl" p="md" className={classes.side}>
            <Title>Latest Games</Title>
            <Table className={classes.table} highlightOnHover>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </Paper>
        </Stack>
      </Box>
      <ReplayModal
        opened={!!activeReplay}
        replayId={activeReplay!}
        onClose={() => setActiveReplay(null)}
      />
    </>
  );
};

export default Profile;
