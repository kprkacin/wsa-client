import React from 'react';
import { TextInput as MInput, TextInputProps } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.gray[6],
  },
  root: {
    textAlign: 'start',
  },
}));

type Props = TextInputProps & {
  //
};

const TextInput: React.FC<Props> = (props) => {
  const { icon, placeholder, label, ...otherInputProps } = props;

  const { classes } = useStyles();

  return (
    <MInput
      classNames={{
        root: classes.root,
        label: classes.label,
      }}
      label={label}
      icon={icon}
      placeholder={placeholder}
      {...otherInputProps}
    />
  );
};

export default TextInput;
