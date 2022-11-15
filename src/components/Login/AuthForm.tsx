import { Box, Button, createStyles, Paper, Title } from '@mantine/core';
import React from 'react';

import { PasswordInput, TextInput } from '../Input';
import {
  AuthActionTypes,
  LoginForm,
  StringKVPair,
} from '../../services/auth/types';
import { IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  drawer: {
    //  backgroundColor: '#190e4f',
    backgroundColor: 'rgba( 247, 240, 240, 0.2 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 5.5px )',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    opacity: 0.1,
  },
  root: {
    textAlign: 'start',
  },
}));

interface Props {
  authType: AuthActionTypes;
  form: LoginForm;
  errors: StringKVPair;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleAction: () => void;
}

const AuthForm: React.FC<Props> = (props) => {
  const { authType, form, errors, handleChange, handleAction } = props;

  const text = () => {
    switch (authType) {
      case AuthActionTypes.SIGN_IN:
        return 'Sign In';
      case AuthActionTypes.AS_GUEST:
        return 'Continue as Guest';
      default:
        return 'Sign Up';
    }
  };

  return (
    <Paper radius={'xl'} className="box" p={16}>
      <Title order={1} align="center" color="gray.8">
        {text()}
      </Title>

      {authType !== AuthActionTypes.SIGN_IN && (
        <TextInput
          label="Name"
          required
          value={form.name}
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          error={errors.name}
          p={8}
        />
      )}
      {(authType === AuthActionTypes.SIGN_UP ||
        authType === AuthActionTypes.SIGN_IN) && (
        <>
          <TextInput
            label="Email"
            required
            value={form.email}
            name="email"
            placeholder="Enter your email"
            icon={<IconAt />}
            onChange={handleChange}
            error={errors.email}
            p={8}
          />
          <PasswordInput
            name="password"
            value={form.password}
            placeholder="Enter your Password"
            label="Password"
            onChange={handleChange}
            error={errors.password}
            p={8}
          />
        </>
      )}
      <Box
        sx={() => ({
          display: 'flex',
          justifyContent: 'flex-end',
        })}
      >
        <Button
          variant="light"
          color="violet"
          size="xl"
          uppercase
          onClick={handleAction}
        >
          Continue
        </Button>
      </Box>
    </Paper>
  );
};
export default AuthForm;
