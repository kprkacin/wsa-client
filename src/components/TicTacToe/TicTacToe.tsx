/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { ActionIcon, Box, Grid } from '@mantine/core';
import { PlayerStates, Square, SquareSymbol } from './types';
import { IconCircle, IconX } from '@tabler/icons';
import { replacePropertyInArray } from '../../services/helpers';

import io from 'socket.io-client';
import RotateBox from '../RotateBox';
import { useSocket } from '../../services/socket/SocketProvider';

// const socket = io('http://localhost:7500', {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'abcd',
//   },
// });

type Props = {
  //
};

const TicTacToe: React.FC = (props: Props) => {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill({}));
  const [activeSymbol, setActiveSymbol] = useState<SquareSymbol | null>(null);
  const [activeTurn, setActiveTurn] = useState<boolean>(false);
  const [result, setResult] = useState<SquareSymbol | null>(null);
  const [playerState, setPlayerState] = useState<PlayerStates>(
    PlayerStates.ACTIVE,
  );

  const { socket } = useSocket();
  console.log('what');

  console.log(activeSymbol);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('game.begin', (data: any) => {
      console.log('game.begin');
      const { symbol, turn }: { symbol: SquareSymbol; turn: boolean } = data;
      setActiveSymbol(SquareSymbol[symbol]);
      setActiveTurn(turn);
    });

    socket.on('move.made', (data: any) => {
      const { squares, turn }: { squares: Square[]; turn: boolean } = data;
      console.log('sq', squares);
      setSquares(squares);
      setActiveTurn(turn);
    });

    socket.on('game.over', (data: any) => {
      const { winner }: { winner: SquareSymbol } = data;

      console.log(data);
      setActiveTurn(false);
      setPlayerState(PlayerStates.ACTIVE);
      setResult(SquareSymbol[winner]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat message response');
    };
  }, []);

  console.log(squares);

  const handleSquareClick = (square: Square, index: number) => {
    if (square.symbol) {
      return;
    }
    const newSquares = replacePropertyInArray(
      squares,
      index,
      activeSymbol,
      'symbol',
    );

    console.log(newSquares);
    socket.emit('make.move', newSquares);

    setSquares(newSquares);
  };

  const handleQueClicked = () => {
    setSquares(Array(9).fill({}));
    const state =
      playerState === PlayerStates.ACTIVE
        ? PlayerStates.QUEUED
        : PlayerStates.ACTIVE;
    socket.emit('queuing', state);
    setPlayerState(state);
    setResult(null);
  };
  return (
    <>
      <h1>
        {result
          ? activeSymbol === result
            ? 'Congrats!'
            : 'Better luck next time!'
          : activeTurn
          ? 'YOUR TURN'
          : 'OPPONENTS TURN'}
      </h1>
      <h2>{playerState}</h2>
      <button onClick={handleQueClicked}>Que</button>
      <Grid
        sx={(theme) => ({
          width: '50%',
          margin: 'auto',
          opacity: activeTurn ? 1 : 0.8,
          pointerEvents: activeTurn ? 'all' : 'none',
        })}
      >
        {squares.map((box, index) => {
          return (
            <Grid.Col span={4} key={index}>
              <ActionIcon
                sx={(theme) => ({
                  border: 0,
                  pointerEvents: box.symbol && 'none',
                })}
                variant="default"
                size={264}
                onClick={() => {
                  handleSquareClick(box, index);
                }}
              >
                <RotateBox symbol={box.symbol} />
              </ActionIcon>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default TicTacToe;
