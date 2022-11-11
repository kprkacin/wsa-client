import {
  Box,
  createStyles,
  Grid,
  Group,
  Stack,
  Table,
  Title,
  Text,
} from '@mantine/core';
import React from 'react';
import { Avatar } from '../../components/Avatar';
import { useAuth } from '../../services/auth/AuthProvider';
import CardAvatar from './CardAvatar';

const useStyles = createStyles((theme) => ({
  group: {
    minHeight: '350px',

    justifyContent: 'space-between',
  },
  stack: {
    minHeight: '350px',
    justifyContent: 'space-between',
  },
  groups: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  boxWin: {
    minWidth: '200px',
    minHeight: '200px',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.green[3],
  },
  boxLoss: {
    minWidth: '200px',
    minHeight: '200px',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.red[3],
  },
  row: {
    minWidth: '200px',
    minHeight: '200px',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    backgroundColor: theme.colors.red[3],
  },
  table: {
    width: '100%',
    padding: '3rem 5rem 3rem 5rem',
    borderRadius: '32px',
    marginTop: '2rem',
    backgroundColor: 'white',
    border: 0,
    'tbody tr td': {
      borderBottom: 0,
      padding: '1rem 0rem',
    },
  },
}));

type Props = {
  //
};

const Leaderboard: React.FC = (props: Props) => {
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
      <td>
        <Group>
          <Avatar>{Math.random().toString(32).slice(2)[0]}</Avatar>
          {Math.random().toString(32).slice(2)}
        </Group>
      </td>
      <td>{Math.ceil(Math.random() * 100)}</td>
      <td>{Math.ceil(Math.random() * 100)}</td>
    </tr>
  ));
  return (
    <>
      <Group className={classes.group}>
        <Group>
          <CardAvatar />
          <CardAvatar />
          <CardAvatar />
        </Group>
        <Stack className={classes.stack}>
          <Title>Your Stats</Title>
          <Group>
            <Box className={classes.boxWin}>
              <Text color={'white'}>Wins</Text>
              <Text size={96} color={'white'}>
                10
              </Text>
            </Box>
            <Box className={classes.boxLoss}>
              <Text color={'white'}>Losses</Text>
              <Text size={96} color={'white'}>
                10
              </Text>
            </Box>
          </Group>
        </Stack>
      </Group>

      <Table className={classes.table} highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Leaderboard;
