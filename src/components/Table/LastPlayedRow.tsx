import {
  Button,
  createStyles,
  Group,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Avatar } from '../Avatar';
import React, { useEffect, useState } from 'react';
import { User } from '../../services/users';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';
import { Result } from '../../services/results';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  main: {
    backgroundColor: ' rgba( 255, 255, 255, 0.1 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '32px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

interface MessageProps {
  index: number;
  result: Result;
  setActiveReplay: (resultId: string) => void;
}

const LastPlayedRow: React.FC<MessageProps> = (props) => {
  const { result, index, setActiveReplay } = props;

  const [userX, setUserX] = useState<User | null>(null);
  const [userO, setUserO] = useState<User | null>(null);
  const [winner, setWinner] = useState<User | null>(null);
  const { classes } = useStyles();
  const { getUser } = useUserMiddleware();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const userXData = await getUser(result.playerX);
        const userOData = await getUser(result.playerO);
        const winnerData = await getUser(result.winner);
        setUserO(userOData);
        setUserX(userXData);
        setWinner(winnerData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [result]);

  const navigateToUserPage = (userId: string | null | undefined) => {
    console.log(userId);
    if (!userId) return;
    return navigate(`/user/${userId}`);
  };

  return (
    <>
      <td>{index + 1}</td>
      <td>
        <Group>
          <UnstyledButton onClick={() => navigateToUserPage(userX?.id)}>
            <Avatar>{userX?.name?.[0]}</Avatar>
          </UnstyledButton>
          {userX?.name}
        </Group>
      </td>
      <td>
        <Group>
          <UnstyledButton onClick={() => navigateToUserPage(userO?.id)}>
            <Avatar>{userO?.name?.[0]}</Avatar>
          </UnstyledButton>
          {userO?.name}
        </Group>
      </td>
      <td>
        <Group>
          <Avatar>{winner?.name?.[0]}</Avatar>
          {winner?.name}
        </Group>
      </td>
      <td>
        <Button onClick={() => setActiveReplay(result.id)}>Replay</Button>
      </td>
    </>
  );
};

export default LastPlayedRow;
