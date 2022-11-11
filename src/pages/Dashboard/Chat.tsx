import { createStyles, Paper, Text, Title } from '@mantine/core';
import React from 'react';
import { TicTacToe } from '../../components';
import { Avatar } from '../../components/Avatar';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255, 0.1 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

type Props = {
  //
};

const Chat: React.FC = (props: Props) => {
  const { classes } = useStyles();
  return (
    <Paper shadow="xs" radius="xl" p="md" className={classes.main}>
      <Title>Lobby</Title>

      <Paper className={classes.main}>
        <Avatar color={'cyan'} size={'lg'}>
          T
        </Avatar>
        <Text ml={20} color="black">
          This is a another message{' '}
        </Text>
      </Paper>
      <Paper>
        <Avatar color={'cyan'} size={'lg'}>
          T
        </Avatar>
        <Text ml={20} color="black">
          This is a another message{' '}
        </Text>
      </Paper>
      <Paper>
        <Avatar color={'cyan'} size={'lg'}>
          T
        </Avatar>
        <Text ml={20} color="black">
          This is a another message{' '}
        </Text>
      </Paper>
      <Paper>
        <Avatar color={'cyan'} size={'lg'}>
          T
        </Avatar>
        <Text ml={20} color="black">
          This is a another message{' '}
        </Text>
      </Paper>
    </Paper>
  );
};

export default Chat;

{
  /* 

  <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <Box
          sx={(theme) => ({
            width: '30%',
            height: '200px',
            backgroundColor: 'rgba( 247, 240, 240, 0.1 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 5.5px )',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
          })}
        >
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'cyan'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a another message{' '}
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'green',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'blue'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a user message{' '}
            </Text>
          </Box>
          <Box
            sx={(theme) => ({
              margin: '10px',
              backgroundColor: 'white',
              borderRadius: '5px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            })}
          >
            <Avatar color={'cyan'} size={'lg'}>
              T
            </Avatar>
            <Text ml={20} color="black">
              This is a message{' '}
            </Text>
          </Box>
        </Box>
      </Box>
*/
}
