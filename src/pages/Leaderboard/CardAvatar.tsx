import React, { useEffect, useState } from 'react';
import {
  Avatar as MAvatar,
  AvatarProps,
  Box,
  TextInputProps,
  Title,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Avatar } from '../../components/Avatar';
import { Rank } from '../../services/ranks';
import { useUserMiddleware } from '../../services/users/useUserMiddleware';
import { User } from '../../services/users';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: '300px',
    minHeight: '350px',
    minWidth: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    position: 'relative',
    bottom: 0,
  },
}));

type Props = {
  rank?: Rank;
  index: number;
};

const CardAvatar: React.FC<Props> = (props) => {
  const { rank, index } = props;
  const { classes } = useStyles();
  const { getUser } = useUserMiddleware();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (rank?.userId) {
          const userData = await getUser(rank.userId);
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [rank?.userId]);

  const navigateToUserPage = (userId: string | null | undefined) => {
    console.log(userId);
    if (!userId) return;
    return navigate(`/user/${userId}`);
  };

  return (
    <Card className={classes.card} shadow="sm" p="lg" radius="xl" withBorder>
      <Box>
        <Card.Section className={classes.section}>
          <Avatar size="xl">{user?.name?.[0]}</Avatar>
        </Card.Section>

        <Text mt={15} weight={500}>
          {user?.name}
        </Text>

        <Title mt={15}>{index + 1}</Title>
      </Box>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigateToUserPage(user?.id)}
        className={classes.button}
      >
        Go to profile
      </Button>
    </Card>
  );
};

export default CardAvatar;
