/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { ActionIcon, Badge, Box, Button, Grid, Group } from '@mantine/core';
import { PlayerStates, Square, SquareSymbol } from './types';
import { IconCircle, IconX } from '@tabler/icons';
import { replacePropertyInArray } from '../../services/helpers';

import io from 'socket.io-client';
import RotateBox from '../RotateBox';
import { useSocket } from '../../services/socket/SocketProvider';
import { hideNotification, showNotification } from '@mantine/notifications';

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

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('game.begin', (data: any) => {
      console.log('game.begin');
      const { symbol, turn }: { symbol: SquareSymbol; turn: boolean } = data;
      setActiveSymbol(SquareSymbol[symbol]);
      setActiveTurn(turn);
      setPlayerState(PlayerStates.IN_GAME);
      hideNotification('queuing');
      showNotification({
        id: 'queuing',
        message: 'Match found! Connecting...',
        color: 'teal',
        title: 'Connecting',
      });
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
    showNotification({
      id: 'queuing',
      message: 'Finding opponent...',
      autoClose: false,
      title: 'In Queue',
      loading: true,
      onClose: () => {
        setPlayerState(PlayerStates.ACTIVE);
        socket.emit('queuing', PlayerStates.ACTIVE);
      },
    });
  };

  const renderBadge = () => {
    switch (true) {
      case activeSymbol === result: {
        return (
          <Badge size="xl" p={25} color="green">
            Congratulations
          </Badge>
        );
      }
      case result !== null: {
        return (
          <Badge size="xl" p={25} color="red">
            Better luck next time
          </Badge>
        );
      }
      case activeTurn: {
        return (
          <Badge size="xl" p={25} color="green">
            Your turn
          </Badge>
        );
      }
      default: {
        return (
          <Badge size="xl" p={25} color="red">
            Opponents' turn
          </Badge>
        );
      }
    }
  };

  return (
    <>
      <Group
        align="center"
        style={{
          justifyContent: 'space-between',
          paddingRight: '10%',
          paddingLeft: '10%',
          margin: '3rem',
        }}
      >
        <Box>{activeSymbol && renderBadge()}</Box>
        <Button
          size="xl"
          variant="outline"
          color="grape"
          disabled={
            playerState === PlayerStates.IN_GAME ||
            playerState === PlayerStates.QUEUED
          }
          onClick={handleQueClicked}
        >
          Queue
        </Button>
      </Group>

      <Grid
        grow
        sx={(theme) => ({
          margin: 'auto',
          opacity: activeTurn ? 1 : 0.8,
          width: '850px',
          pointerEvents: activeTurn ? 'all' : 'none',
        })}
      >
        {squares.map((box, index) => {
          return (
            <Grid.Col span={4} key={index}>
              <ActionIcon
                sx={(theme) => ({
                  backgroundColor: box.symbol
                    ? box.symbol === SquareSymbol.O
                      ? theme.colors.grape
                      : theme.colors.grape
                    : theme.colors.grape[5],
                  borderRadius: '1rem',
                  pointerEvents: box.symbol && 'none',
                  transition: 'background-color 0.3s',
                  svg: {
                    opacity: box.symbol ? 1 : 0,
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: theme.colors.grape,
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
    </>
  );
};

export default TicTacToe;
