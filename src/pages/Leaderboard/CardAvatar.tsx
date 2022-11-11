import React from 'react';
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

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: '300px',
    minHeight: '350px',
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
  //
};

const CardAvatar: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card} shadow="sm" p="lg" radius="xl" withBorder>
      <Box>
        <Card.Section className={classes.section}>
          <Avatar size="xl">T</Avatar>
        </Card.Section>

        <Text mt={15} weight={500}>
          Norway Fjord Adventures
        </Text>

        <Text mt={15} size="sm" color="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>
      </Box>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        className={classes.button}
      >
        Book classic tour now
      </Button>
    </Card>
  );
};

export default CardAvatar;
