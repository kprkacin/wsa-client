export interface AuthProviderProps {
  children?: React.ReactNode;
}

export interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  AS_GUEST = 'AS_GUEST',
}

export interface StringKVPair {
  [key: string]: string;
}
