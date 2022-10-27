import { User } from './types';

export const transformUser = (res: any): User => ({
  id: res.user._id,
  name: res.user.name,
  token: res.token,
});
