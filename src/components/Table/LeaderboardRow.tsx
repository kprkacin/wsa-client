import {
  createStyles,
  Group,
  Paper,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Avatar } from '../Avatar';
import React, { useEffect, useState } from 'react';
import { initialUser, User } from '../../services/users';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';
import { Result } from '../../services/results';
import { useNavigate } from 'react-router-dom';
import { Rank } from '../../services/ranks';
import { initialRank } from '../../services/ranks/consts';

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
  rank: Rank;
}

const LastPlayedRow: React.FC<MessageProps> = (props) => {
  const { rank, index } = props;

  const [user, setUser] = useState<User | null>(initialUser);
  const { classes } = useStyles();
  const { getUser } = useUserMiddleware();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser(rank.userId);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [rank.userId]);

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
          <UnstyledButton onClick={() => navigateToUserPage(user?.id)}>
            <Avatar>{user?.name?.[0]}</Avatar>
          </UnstyledButton>
          {user?.name}
        </Group>
      </td>
      <td>
        <Text>{rank.wins}</Text>
      </td>
      <td>
        <Text>{rank.losses}</Text>
      </td>
    </>
  );
};

export default LastPlayedRow;
