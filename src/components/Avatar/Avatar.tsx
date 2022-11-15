import React from 'react';
import {
  Avatar as MAvatar,
  AvatarProps,
  Image,
  TextInputProps,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import { useAuth } from '../../services/auth/AuthProvider';
import { IconUser } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

type Props = AvatarProps & {
  avatarId?: number;
};

const Avatar: React.FC<Props> = (props) => {
  const { avatarId, ...otherInputProps } = props;

  const { classes } = useStyles();

  return (
    <MAvatar
      classNames={{
        root: classes.root,
      }}
      radius="xl"
      {...otherInputProps}
    >
      {avatarId ? (
        <Image src={`avatars/${avatarId}.png`} alt="Avatar image" />
      ) : (
        <IconUser />
      )}
    </MAvatar>
  );
};

export default Avatar;
