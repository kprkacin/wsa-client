import { createApiCall } from '../api/api';
import { transformUser, transformUsers, User } from '../users';

export const getUserById = async (id: string): Promise<User> => {
  const resp = await createApiCall({
    url: `/user/${id}`,
    method: 'GET',
  })();

  return transformUser(resp.data);
};
export const getUsers = async (): Promise<User[]> => {
  const resp = await createApiCall({
    url: `/users`,
    method: 'GET',
  })();
  //fix transformation
  return resp.data.map((u: any) => transformUser({ user: u }));
};
