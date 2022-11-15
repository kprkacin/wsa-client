import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api/api';
import { getCurrentUser } from '../../services/auth/api';
import { useAuth } from '../../services/auth/AuthProvider';
import { clearAccessToken, getAccessToken } from '../../services/auth/helpers';

export const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user, setActiveUser } = useAuth();
  const location = useLocation();

  if (!user.id) {
    const token = getAccessToken();
    if (token) {
      (async () => {
        try {
          api.defaults.headers.common.Authorization = 'Bearer ' + token;

          const user = await getCurrentUser();

          setActiveUser({
            ...user,
            token,
            avatarId: Math.floor(Math.random() * (10 - 1) + 1),
          });
        } catch (error) {
          clearAccessToken();
          return <Navigate to="/login" state={{ from: location }} replace />;
        }
      })();
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
