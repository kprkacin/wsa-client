import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { ProviderProps, User, UserKV } from './types';
import { getUserById, getUsers } from './api';
import { initialUser } from './consts';
import { useAuth } from '../auth/AuthProvider';

interface UserMiddlewareContext {
  users: UserKV;
  getUser: (id: string) => Promise<User | null>;
  getUserName: (id: string) => Promise<string>;
  preloadUsers: (ids: string[]) => void;
}
export const UserMiddlewareProviderContext =
  React.createContext<UserMiddlewareContext>({
    users: {},
    getUser: async (id: string) => Promise.resolve(null),
    getUserName: (id: string) => Promise.resolve(''),
    preloadUsers: async (ids: string[]) => null,
  });

export const UserMiddlewareProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserKV>({});

  const { user: activeUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const usersData = await getUsers();
        const formatted = usersData.reduce((acc, user) => {
          if (user.id) {
            acc[user.id] = {
              ...user,
              avatarId: Math.floor(Math.random() * (10 - 1) + 1),
            };
          }
          return acc;
        }, {} as UserKV);
        setUsers((old) => ({ ...old, ...formatted }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const getUser = async (id: string) => {
    if (!id) {
      return null;
    }

    if (id === activeUser.id) {
      return activeUser;
    }
    if (users[id]) {
      return users[id];
    }

    try {
      const user = await getUserById(id);
      setUsers((old) => ({ ...old, [id]: user }));
      return user;
    } catch (error) {
      // ignore
    }
    return null;
  };

  const getUserName = async (id: string) => {
    const user = await getUser(id);
    return user?.name || '';
  };
  const preloadUsers = async (ids: string[]) => {
    await Promise.all(ids.map((id) => getUser(id)));
  };
  const providerValue = useMemo(
    () => ({
      users,
      getUser,
      getUserName,
      preloadUsers,
    }),
    [users, getUser, getUserName],
  );

  return (
    <UserMiddlewareProviderContext.Provider value={providerValue}>
      {children}
    </UserMiddlewareProviderContext.Provider>
  );
};

export const useUserMiddleware = () => {
  return useContext(UserMiddlewareProviderContext);
};
