import { UserUpdateForm } from './types';

export const transformToUserRequest = (form: UserUpdateForm): any => {
  console.log(form);
  const { name, email, password } = form;
  let obj = {};
  if (name) {
    obj = { ...obj, name };
  }
  if (email) {
    obj = { ...obj, email };
  }
  if (password) {
    obj = { ...obj, password };
  }
  return obj;
};
