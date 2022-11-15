import { createApiCall } from '../api/api';
import { transformUser, User, UserUpdateForm } from '../users';
import { transformToUserRequest } from './transformations';

export const getUserById = async (id: string): Promise<User> => {
  const resp = await createApiCall({
    url: `/user/${id}`,
    method: 'GET',
  })();

  return transformUser(resp.data);
};

export const updateUser = async (
  id: string,
  newUser: UserUpdateForm,
): Promise<User> => {
  const resp = await createApiCall({
    url: `/user/${id}`,
    method: 'PUT',
    data: transformToUserRequest(newUser),
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
