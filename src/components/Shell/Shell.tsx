import React from 'react';
import { AppShell, Navbar, Header, BackgroundImage } from '@mantine/core';
import SideNav from '../SideNav';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthProvider';

const Shell: React.FC = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <AppShell
      padding="md"
      aside={user.id ? <SideNav /> : undefined}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[2],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};
export default Shell;
