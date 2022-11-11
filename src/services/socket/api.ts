import { createApiCall } from '../api/api';
import { transformUser, User } from '../users';

export const loginUser = async (name: string) => {
  const resp = await createApiCall(
    {
      url: '/auth/guest',
      method: 'POST',
      data: { name: name },
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
