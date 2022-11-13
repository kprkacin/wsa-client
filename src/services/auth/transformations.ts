import { LoginForm } from './types';
import { User } from '../users/types';

export const transformUser = (res: any): User => ({
  id: res.user._id,
  name: res.user.name,
  email: res.user.email,
  token: res.token,
});
export const transformUsers = (res: any): User => ({
  id: res._id,
  name: res.name,
  email: res.email,
  token: '',
});

export const transformToAuthRequest = (form: LoginForm): any => ({
  name: form.name,
  email: form.email,
  password: form.password,
});
