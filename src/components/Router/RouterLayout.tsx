import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import { Game, Dashboard, Profile } from '../../pages';
import { Leaderboard } from '../../pages/Leaderboard';
import { AuthProvider } from '../../services/auth/AuthProvider';
import { SocketProvider } from '../../services/socket/SocketProvider';
import ErrorPage from '../ErrorPage';
import LoginPage from '../Login/LoginPage';
import { RequireAuth } from './RequireAuth';

const Layout = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Routes>
          <Route element={<App />}>
            {/* <Route path="/" element={<ErrorPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/game"
              element={
                <RequireAuth>
                  <Game />
                </RequireAuth>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <RequireAuth>
                  <Leaderboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  );
};

export default Layout;
