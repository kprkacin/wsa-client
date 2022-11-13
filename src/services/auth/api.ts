import { createApiCall } from '../api/api';
import { transformToAuthRequest, transformUser, User } from '../users';
import { LoginForm } from './types';

export const signUp = async (form: LoginForm) => {
  const resp = await createApiCall(
    {
      url: '/auth/register',
      method: 'POST',
      data: transformToAuthRequest(form),
    },
    {
      success: 'Logged in successfully',
    },
  )();

  return transformUser(resp.data);
};
export const signIn = async (form: LoginForm) => {
  const resp = await createApiCall(
    {
      url: '/auth/login',
      method: 'POST',
      data: transformToAuthRequest(form),
    },
    {
      success: 'Logged in successfully',
    },
  )();

  return transformUser(resp.data);
};

export const getCurrentUser = async (): Promise<User> => {
  const resp = await createApiCall({
    url: '/auth/active',
    method: 'GET',
  })();

  return transformUser(resp.data);
};
