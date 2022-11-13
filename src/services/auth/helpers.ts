import { getStrength } from '../../components/Input/PasswordInput/helpers';
import { api } from '../api/api';
import { AuthActionTypes, LoginForm, StringKVPair } from './types';

export const setAccessToken = (token: string) => {
  api.defaults.headers.common.Authorization = 'Bearer ' + token;
  localStorage.setItem('token', token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAccessToken = () => {
  api.defaults.headers.common.Authorization = null;
  localStorage.removeItem('token');
};

export const validateLoginForm = (
  loginForm: LoginForm,
  authType: AuthActionTypes,
) => {
  const errors: StringKVPair = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  switch (authType) {
    case AuthActionTypes.SIGN_UP:
      errors['name'] =
        loginForm.name.length < 3
          ? 'Username must be at least 3 characters long'
          : '';
      errors['password'] =
        getStrength(loginForm.password) !== 100 ? 'Password is too weak' : '';
      errors['email'] = emailRegex.test(loginForm.email) ? '' : 'Invalid email';
      break;
    case AuthActionTypes.SIGN_IN:
      errors['password'] =
        loginForm.password.length > 0 ? '' : 'Password is too short';
      errors['email'] = emailRegex.test(loginForm.email) ? '' : 'Invalid email';

      break;

    default:
      errors['name'] =
        loginForm.name.length < 3
          ? 'Username must be at least 3 characters long'
          : '';
      break;
  }

  return errors;
};
