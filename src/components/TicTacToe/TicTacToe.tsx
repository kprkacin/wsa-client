/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { ActionIcon, Box, Grid } from '@mantine/core';
import { Square, SquareSymbol } from './types';
import { IconCircle, IconX } from '@tabler/icons';
import { replacePropertyInArray } from '../../services/helpers';

import io from 'socket.io-client';
const socket = io('http://localhost:8000', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

type Props = {
  //
};

const TicTacToe: React.FC = (props: Props) => {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill({}));
  const [activeSymbol, setActiveSymbol] = useState<SquareSymbol | null>(null);

  console.log(activeSymbol);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('game.begin', (data: { symbol: SquareSymbol }) => {
      setActiveSymbol(SquareSymbol[data.symbol]);
    });

    socket.on('move.made', (data: Square[]) => {
      setSquares(data);
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
    socket.emit('make.move', newSquares);

    setSquares(newSquares);
  };
  return (
    <Grid
      sx={(theme) => ({
        width: '50%',
        margin: 'auto',
      })}
    >
      {squares.map((box, index) => {
        return (
          <Grid.Col span={4} key={index}>
            <ActionIcon
              sx={(theme) => ({
                backgroundColor: box.symbol
                  ? box.symbol === SquareSymbol.O
                    ? 'green'
                    : 'yellow'
                  : theme.colorScheme === 'dark'
                  ? 'red'
                  : 'blue',
                borderRadius: '1rem',
                pointerEvents: box.symbol && 'none',
                transition: 'background-color 0.3s',
                svg: {
                  opacity: box.symbol ? 1 : 0,
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? 'blue' : 'red',
                  svg: {
                    opacity: 0.4,
                  },
                },
              })}
              variant="default"
              size={264}
              onClick={() => {
                handleSquareClick(box, index);
              }}
            >
              {box.symbol ? (
                box.symbol === SquareSymbol.O ? (
                  <IconCircle size={128} />
                ) : (
                  <IconX size={128} />
                )
              ) : activeSymbol === SquareSymbol.O ? (
                <IconCircle size={128} />
              ) : (
                <IconX size={128} />
              )}
            </ActionIcon>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default TicTacToe;
