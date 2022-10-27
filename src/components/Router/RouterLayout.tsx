import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import { GamePage } from '../../pages';
import { AuthProvider } from '../../services/auth/AuthProvider';
import ErrorPage from '../ErrorPage';
import LoginPage from '../Login/LoginPage';
import { RequireAuth } from './RequireAuth';

const Layout = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/game"
            element={
              <RequireAuth>
                <GamePage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default Layout;
