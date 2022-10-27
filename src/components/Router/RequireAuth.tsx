import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthProvider';

export const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
