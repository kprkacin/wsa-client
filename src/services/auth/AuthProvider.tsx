import React, { useCallback, useContext, useState } from 'react';
import { initialUser, User } from '../users';
import { clearAccessToken, setAccessToken } from './helpers';
import { AuthProviderProps } from './types';

interface AuthContext {
  user: User;
  logIn: (user: User, callback: () => void) => void;
  logOut: (callback: () => void) => void;
  setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}
export const AuthProviderContext = React.createContext<AuthContext>({
  user: initialUser,
  logIn: (user: User) => undefined,
  logOut: () => undefined,
  setActiveUser: (user: User | ((prevState: User) => User)) => {
    //
  },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User>(initialUser);

  const logIn = useCallback((user: User, callback: () => void) => {
    setActiveUser(user);
    if (user.token) {
      setAccessToken(user.token);
    }
    callback();
  }, []);

  const logOut = useCallback((callback: () => void) => {
    setActiveUser(initialUser);
    clearAccessToken();
    callback();
  }, []);

  return (
    <AuthProviderContext.Provider
      value={{
        user: activeUser,
        logIn,
        logOut,
        setActiveUser,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthProviderContext);
};
