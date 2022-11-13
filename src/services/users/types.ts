import React from 'react';

export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
}

export interface ProviderProps {
  children?: React.ReactNode;
}

export interface UserKV {
  [id: string]: User;
}
