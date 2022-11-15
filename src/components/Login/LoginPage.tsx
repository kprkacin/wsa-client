/* eslint-disable no-case-declarations */
import { useEffect, useState } from 'react';
import { Box, Button, createStyles, Stack } from '@mantine/core';
import React from 'react';
import { Drawer } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../services/auth/api';
import { useAuth } from '../../services/auth/AuthProvider';
import { AuthActionTypes, StringKVPair } from '../../services/auth/types';
import { initialLoginForm } from '../../services/auth/consts';
import AuthForm from './AuthForm';
import { validateLoginForm } from '../../services/auth/helpers';

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

const LoginPage: React.FC = () => {
  const [authType, setAuthType] = useState<AuthActionTypes | null>(null);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [error, setError] = useState<StringKVPair>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const { classes } = useStyles();

  const handleLoginClicked = async () => {
    const errors = validateLoginForm(loginForm, authType!);
    console.log(errors);
    if (Object.values(errors).some((e) => e.length > 0)) {
      console.log(Object.values(errors));
      setError(errors);
      return;
    }
    try {
      switch (authType) {
        case AuthActionTypes.SIGN_IN:
          const userSignIn = await signIn(loginForm);
          logIn(userSignIn, () => navigate(from));
          break;
        case AuthActionTypes.AS_GUEST:
          const userSignUpGuest = await signUp(loginForm);
          logIn(userSignUpGuest, () => navigate(from));
          break;
        default:
          const user = await signUp(loginForm);
          logIn(user, () => navigate(from));
          break;
      }
    } catch (error) {
      // ignore
    }
  };

  useEffect(() => {
    setError({});
    setLoginForm(initialLoginForm);
  }, [authType]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({});
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  return (
    <Box className="login">
      <Drawer
        opened={!!authType}
        onClose={() => setAuthType(null)}
        padding="xl"
        size="100%"
        position="top"
        classNames={{
          drawer: classes.drawer,
        }}
      >
        <AuthForm
          authType={authType || AuthActionTypes.AS_GUEST}
          form={loginForm}
          errors={error}
          handleChange={handleFormChange}
          handleAction={handleLoginClicked}
        />
      </Drawer>
      <Stack
        style={{
          maxWidth: '300px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Button
          variant="light"
          color="grape"
          size="xl"
          radius="lg"
          uppercase
          onClick={() => {
            setAuthType(AuthActionTypes.AS_GUEST);
          }}
        >
          Play as Guest
        </Button>
        <Button
          variant="light"
          color="grape"
          size="xl"
          radius="lg"
          uppercase
          onClick={() => {
            setAuthType(AuthActionTypes.SIGN_UP);
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="light"
          color="grape"
          size="xl"
          radius="lg"
          uppercase
          onClick={() => {
            setAuthType(AuthActionTypes.SIGN_IN);
          }}
        >
          Sign In
        </Button>
      </Stack>

      {Array(250)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="circle-container" key={index}>
              <div className="circle" />
            </div>
          );
        })}
    </Box>
  );
};
export default LoginPage;
