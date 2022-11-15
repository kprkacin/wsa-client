import { createStyles, Group, Paper } from '@mantine/core';
import React from 'react';
import { TicTacToe } from '../../components';
import GameChat from './GameChat';
const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: 'rgba( 255, 255, 255,0.7 )',
    boxShadow: '2.5px 2.5px 5px gray.2 -2.5px -2.5px 5px #ffffff;',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
    width: '70%',
  },
  side: {
    width: '25%',
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

const Game: React.FC = (props: Props) => {
  const { classes } = useStyles();
  return (
    <Group>
      <Paper className={classes.main} style={{ paddingBottom: '5rem' }}>
        <TicTacToe />
      </Paper>
      <Paper className={classes.side}>
        <GameChat />
      </Paper>
    </Group>
  );
};

export default Game;
