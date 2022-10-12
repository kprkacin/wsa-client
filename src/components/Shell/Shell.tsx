import React from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';
import SideNav from '../SideNav';
import { Outlet } from 'react-router-dom';

const Shell: React.FC = () => {
  return (
    <AppShell
      padding="md"
      aside={<SideNav />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};
export default Shell;
