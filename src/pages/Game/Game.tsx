import React from 'react';
import { TicTacToe } from '../../components';
import GameChat from './GameChat';

type Props = {
  //
};

const Game: React.FC = (props: Props) => {
  return (
    <>
      <GameChat />
      <TicTacToe />
    </>
  );
};

export default Game;
