/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from 'react';
import { ActionIcon, Box, Grid } from '@mantine/core';
import { PlayerStates, Square, SquareSymbol } from './types';
import { IconCircle, IconX } from '@tabler/icons';
import { replacePropertyInArray } from '../../services/helpers';

import io from 'socket.io-client';
import RotateBox from '../RotateBox';
import { useSocket } from '../../services/socket/SocketProvider';
import { hideNotification, showNotification } from '@mantine/notifications';
import { getReplay, Replay } from '../../services/replay';

type Props = {
  replayId: string;
};

const TicTacToeReplay: React.FC<Props> = (props) => {
  const { replayId } = props;
  const [squares, setSquares] = useState<Square[]>(Array(9).fill({}));
  const [replay, setReplay] = useState<Replay | null>(null);

  const currIndex = useRef(0);

  useEffect(() => {
    (async () => {
      try {
        const replay = await getReplay(replayId);
        setReplay(replay);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [replayId]);

  useEffect(() => {
    const timerId = setInterval(
      () => {
        if (currIndex.current < (replay?.replay || []).length) {
          setSquares(replay?.replay[currIndex.current] || []);
          currIndex.current++;
        } else {
          clearInterval(timerId);
        }
      },

      2000,
    );
    return () => clearInterval(timerId);
  }, [replay]);

  return (
    <>
      <Grid
        sx={(theme) => ({
          width: '60%',
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
                      ? theme.colors.grape
                      : theme.colors.grape
                    : theme.colors.grape[5],
                  borderRadius: '1rem',
                  pointerEvents: 'none',
                  transition: 'background-color 0.3s',
                  svg: {
                    opacity: box.symbol ? 1 : 0,
                    color: 'white',
                  },
                })}
                variant="default"
                size={264}
              >
                {box.symbol &&
                  (box.symbol === SquareSymbol.O ? (
                    <IconCircle size={128} />
                  ) : (
                    <IconX size={128} />
                  ))}
              </ActionIcon>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default TicTacToeReplay;
