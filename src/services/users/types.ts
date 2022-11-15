import React from 'react';

export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  avatarId?: number;
}

export interface ProviderProps {
  children?: React.ReactNode;
}

export interface UserKV {
  [id: string]: User;
}

export interface UserUpdateForm {
  name: string;
  email: string;
  password: string;
}
