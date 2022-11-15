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
  first: {
    borderRadius: '20px 0 0 20px',
    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
  },
  last: {
    borderRadius: '0 20px 20px 0',

    border: ' 1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));

interface MessageProps {
  result: Result;
  profileId: string;
  setActiveReplay: (resultId: string) => void;
}

const LastPlayedRow: React.FC<MessageProps> = (props) => {
  const { result, profileId, setActiveReplay } = props;

  const [userX, setUserX] = useState<User | null>(null);
  const [userO, setUserO] = useState<User | null>(null);
  const [winner, setWinner] = useState<User | null>(null);
  const { classes } = useStyles();
  const { getUser } = useUserMiddleware();
  const navigate = useNavigate();

  console.log(winner, profileId);
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
    <tr
      style={{
        backgroundColor: `${winner?.id === profileId ? '#8CE99A' : '#FFA8A8'}`,
        marginBottom: '10px',
      }}
    >
      <td className={classes.first}>
        <Group>
          <UnstyledButton onClick={() => navigateToUserPage(userX?.id)}>
            <Avatar avatarId={userX?.avatarId}>{userX?.name?.[0]}</Avatar>
          </UnstyledButton>
          {userX?.name}
        </Group>
      </td>
      <td>
        <Group>
          <UnstyledButton onClick={() => navigateToUserPage(userO?.id)}>
            <Avatar avatarId={userO?.avatarId}>{userO?.name?.[0]}</Avatar>
          </UnstyledButton>
          {userO?.name}
        </Group>
      </td>
      <td>
        <Group>
          <Avatar avatarId={winner?.avatarId}>{winner?.name?.[0]}</Avatar>
          {winner?.name}
        </Group>
      </td>
      <td className={classes.last}>
        <Button
          color="grape"
          variant="subtle"
          onClick={() => setActiveReplay(result.id)}
        >
          Replay
        </Button>
      </td>
    </tr>
  );
};

export default LastPlayedRow;
