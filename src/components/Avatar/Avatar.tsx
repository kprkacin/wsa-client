import React from 'react';
import { Avatar as MAvatar, AvatarProps, TextInputProps } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

type Props = AvatarProps & {
  children: React.ReactNode;
};

const Avatar: React.FC<Props> = (props) => {
  const { children, ...otherInputProps } = props;

  const { classes } = useStyles();

  return (
    <MAvatar
      classNames={{
        root: classes.root,
      }}
      {...otherInputProps}
    >
      {children}
    </MAvatar>
  );
};

export default Avatar;
