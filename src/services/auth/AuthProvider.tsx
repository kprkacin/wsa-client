import React, { useCallback, useContext, useState } from 'react';
import { initialUser, User } from '../users';
import { AuthProviderProps } from './types';

export const AuthProviderContext = React.createContext<{
  user: User;
  logIn: (user: User, callback: () => void) => void;
  logOut: (callback: () => void) => void;
}>({
  user: initialUser,
  logIn: (user: User) => undefined,
  logOut: () => undefined,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User>(initialUser);

  const logIn = useCallback((user: User, callback: () => void) => {
    setActiveUser(user);
    callback();
  }, []);

  const logOut = useCallback((callback: () => void) => {
    setActiveUser(initialUser);
    callback();
  }, []);

  return (
    <AuthProviderContext.Provider
      value={{
        user: activeUser,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthProviderContext);
};
