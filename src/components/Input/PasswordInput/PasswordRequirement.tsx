import React from 'react';
import { Text, Box } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { PasswordRequirementProps } from './types';

const PasswordRequirement: React.FC<PasswordRequirementProps> = (props) => {
  const { meets, label } = props;
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};
export default PasswordRequirement;
