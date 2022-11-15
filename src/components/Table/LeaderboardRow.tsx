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
    <tr
      style={{
        backgroundColor: 'white',
        marginBottom: '10px',
      }}
    >
      <td className={classes.first}>{index + 1}</td>
      <td>
        <Group>
          <UnstyledButton onClick={() => navigateToUserPage(user?.id)}>
            <Avatar avatarId={user?.avatarId}>{user?.name?.[0]}</Avatar>
          </UnstyledButton>
          {user?.name}
        </Group>
      </td>
      <td>
        <Text>{rank.wins}</Text>
      </td>
      <td className={classes.last}>
        <Text>{rank.losses}</Text>
      </td>
    </tr>
  );
};

export default LastPlayedRow;
