import {
  AspectRatio,
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  RingProgress,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconAt } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { Avatar } from '../../components/Avatar';
import { PasswordInput, TextInput } from '../../components/Input';
import { ReplayModal } from '../../components/Replay';
import { LastPlayedRow } from '../../components/Table';
import { useAuth } from '../../services/auth/AuthProvider';
import { StringKVPair } from '../../services/auth/types';
import { getRankByUserId, Rank } from '../../services/ranks';
import { initialRank } from '../../services/ranks/consts';
import { getResultsByUserId, Result } from '../../services/results';
import { UserUpdateForm } from '../../services/users';
import { updateUser } from '../../services/users/api';
import { Leaderboard } from '../Leaderboard';
const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255,0.7 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    width: '100%',
  },
  side: {
    width: '100%',
    minHeight: '40vh',
    overflow: 'auto',
    backgroundColor: 'transparent',
  },
  side2: {
    width: '100%',
    minHeight: '30vh',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  sideMain: {
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100vh',
    backgroundColor: 'rgba( 255, 255, 255,0.7) !important',
  },
  table: {
    width: '100%',
    borderRadius: '16px',
    marginTop: '2rem',
    //backgroundColor: 'white',
    border: 0,
    'tbody tr td': {
      border: 0,
      padding: '1rem 0.5rem',
    },

    borderCollapse: 'separate',
    borderSpacing: '0 1em',
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
    minWidth: '45%',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.green[3],
  },
  boxLoss: {
    minWidth: '45%',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.red[3],
  },
  playedNum: {
    color: theme.colors.grape,
    fontSize: '10rem',
  },
}));

type Props = {
  //
};

const Profile: React.FC = (props: Props) => {
  const { user, setActiveUser } = useAuth();
  const { classes } = useStyles();
  const [rank, setRank] = useState<Rank>(initialRank);
  const [results, setResults] = useState<Result[]>([]);
  const [activeReplay, setActiveReplay] = useState<string | null>(null);
  const [errors, setErrors] = useState<StringKVPair>({});
  const [userForm, setUserForm] = useState<UserUpdateForm>({
    name: user.name || '',
    email: user.email || '',
    password: '',
  });

  useEffect(() => {
    (async () => {
      try {
        if (user.id) {
          const userRank = await getRankByUserId(user.id);
          setRank(userRank);
          const userResults = await getResultsByUserId(user.id);
          setResults(userResults);
          setUserForm({
            name: user.name || '',
            email: user.email || '',
            password: '',
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user.id]);

  const handleModalOpen = (replayId: string) => {
    setActiveReplay(replayId);
  };
  const ths = (
    <tr>
      <th>Player X</th>
      <th>Player O</th>
      <th>Winner</th>
      <th></th>
    </tr>
  );

  const rows = results.map((element, index) => (
    <LastPlayedRow
      result={element}
      key={index}
      profileId={user.id || ''}
      setActiveReplay={handleModalOpen}
    />
  ));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSaveClicked = async () => {
    try {
      if (user.id) {
        await updateUser(user.id, userForm);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '35px',
        }}
      >
        <Stack style={{ width: '60%' }}>
          <Paper shadow="xs" radius="xl" p="md" className={classes.main}>
            <Avatar avatarId={user.avatarId} m="auto" size={200}>
              {user?.name?.[0].toUpperCase()}
            </Avatar>

            <TextInput
              label="Name"
              value={userForm.name}
              name="name"
              onChange={handleChange}
              error={errors.username}
              p={8}
            />

            <TextInput
              label="Email"
              value={userForm.email}
              name="email"
              icon={<IconAt />}
              onChange={handleChange}
              error={errors.email}
              p={8}
            />
            <PasswordInput
              name="password"
              value={userForm.password}
              label="Password"
              onChange={handleChange}
              error={errors.password}
              p={8}
            />
            <Button
              mt={20}
              style={{ minWidth: '100px' }}
              color="grape"
              variant="outline"
              onClick={handleSaveClicked}
            >
              Save
            </Button>
          </Paper>
          <Paper p="md" className={classes.side}>
            <Title weight="700" size="h1" color="gray.6" transform="uppercase">
              Latest Games
            </Title>
            <Table className={classes.table} highlightOnHover>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </Paper>
        </Stack>

        <Stack style={{ width: '35%' }} className={classes.sideMain}>
          <Paper p="md" className={classes.side}>
            <Stack className={classes.stack}>
              <Title
                weight="700"
                size="h1"
                color="gray.6"
                transform="uppercase"
              >
                Your Stats
              </Title>
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

          <Paper p="md" className={classes.side2}>
            <Text>You are within the 90th percentile of players!</Text>
            <RingProgress
              label={
                <Text color="grape" weight={700} align="center" size="xl">
                  90th percentile!
                </Text>
              }
              size={256}
              thickness={26}
              sections={[{ value: 90, color: 'grape' }]}
              style={{ margin: 'auto' }}
            />
          </Paper>
          <Paper p="md" className={classes.side2}>
            <Title weight="700" size="h1" color="gray.6" transform="uppercase">
              Number of games played
            </Title>
            <Title className={classes.playedNum}>
              {rank.wins + rank.losses}
            </Title>
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
