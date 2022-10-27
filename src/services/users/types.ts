import React from 'react';

export interface User {
  id: string | null;
  name: string | null;
  token: string | null;
}

export interface AuthProviderProps {
  children?: React.ReactNode;
}
