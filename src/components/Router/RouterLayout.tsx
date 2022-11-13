import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import { Game, Dashboard, Profile, UserProfile } from '../../pages';
import { Leaderboard } from '../../pages/Leaderboard';
import { AuthProvider } from '../../services/auth/AuthProvider';
import { SocketProvider } from '../../services/socket/SocketProvider';
import { UserMiddlewareProvider } from '../../services/users/useUserMiddleware';
import ErrorPage from '../ErrorPage';
import LoginPage from '../Login/LoginPage';
import { RequireAuth } from './RequireAuth';
import { TicTacToeReplay } from '../../components/Replay';

const Layout = () => {
  return (
    <AuthProvider>
      <UserMiddlewareProvider>
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
              <Route
                path="/user/:id"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </SocketProvider>
      </UserMiddlewareProvider>
    </AuthProvider>
  );
};

export default Layout;
