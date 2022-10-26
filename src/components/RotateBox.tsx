import { ActionIcon, BackgroundImage, Box, Transition } from '@mantine/core';
import React, { useState } from 'react';
import { SquareSymbol } from './TicTacToe/types';

type Props = {
  symbol?: SquareSymbol;
};

const RotateBox = (props: Props) => {
  const { symbol } = props;

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        perspective: '1000px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          textAlign: 'center',
          transition: 'transform 0.8s',
          transformStyle: 'preserve-3d',
          transform: symbol ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <BackgroundImage
          src="block.png"
          sx={{
            height: '100%',
            widght: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          radius="sm"
        />
        <BackgroundImage
          src={symbol && symbol === SquareSymbol.X ? 'x.png' : 'o.png'}
          sx={{
            height: '100%',
            widght: '100%',
            position: 'absolute',

            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          radius="sm"
        />
      </Box>
    </Box>
  );
};

export default RotateBox;
