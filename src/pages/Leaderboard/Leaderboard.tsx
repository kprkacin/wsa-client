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
import React, { useEffect, useState } from 'react';
import { Avatar } from '../../components/Avatar';
import { LastPlayedRow, LeaderboardRow } from '../../components/Table';
import { useAuth } from '../../services/auth/AuthProvider';
import { getRanks, Rank } from '../../services/ranks';
import { getResults, getResultsByUserId, Result } from '../../services/results';
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
    borderRadius: '16px',
    marginTop: '2rem',
    //backgroundColor: 'white',
    border: 0,
    'tbody tr td': {
      border: 0,
      padding: '1rem 0.5rem',
    },
    'thead tr th': {
      textAlign: 'center',
    },

    borderCollapse: 'separate',
    borderSpacing: '0 1em',
  },
}));

type Props = {
  limit?: number;
};

const Leaderboard: React.FC<Props> = (props: Props) => {
  const { limit } = props;

  const [ranks, setRanks] = useState<Rank[]>([]);

  const { classes } = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const ranksData = await getRanks();
        setRanks(ranksData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const ths = (
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Losses</th>
    </tr>
  );

  const rows = ranks
    .slice(3)
    .map((element, index) => (
      <LeaderboardRow rank={element} key={index} index={index + 3} />
    ));
  return (
    <>
      <Group className={classes.group}>
        <CardAvatar rank={ranks[0]} index={0} />
        <CardAvatar rank={ranks[1]} index={1} />
        <CardAvatar rank={ranks[2]} index={2} />
      </Group>

      <Table className={classes.table} highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Leaderboard;
