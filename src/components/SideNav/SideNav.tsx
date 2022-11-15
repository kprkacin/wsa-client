import React, { useState } from 'react';
import {
  BackgroundImage,
  Box,
  createStyles,
  Group,
  Navbar,
  Stack,
  Transition,
} from '@mantine/core';
import { ThemeToggle } from '../ThemeToggle';
import NavLink from '../NavLink';
import {
  IconAbacus,
  IconArrowBack,
  IconArrowLeft,
  IconArrowRight,
  IconBrandAppleArcade,
  IconAward,
  IconDoorExit,
  IconGoGame,
  IconHome,
  IconUser,
} from '@tabler/icons';
import { useAuth } from '../../services/auth/AuthProvider';
import { Avatar } from '../Avatar';
import { clearAccessToken } from '../../services/auth/helpers';

const useStyles = createStyles((theme) => ({
  navbar: {
    overflow: 'hidden',
    transition: 'width 500ms ease',
    backgroundColor: theme.colors.gray[0],
    border: 0,
    padding: '5rem 0px 10rem 0px !important',
  },
  mainStack: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'space-between',
  },
  subStack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navLinks: {
    justifyContent: 'center',
    color: theme.colors.gray[4],
    ['span']: {
      margin: '0px !important',
    },
    '&:hover': {
      borderRight: '2px solid',
      backgroundColor: theme.colors.gray[1],
    },
    marginTop: '2rem',
  },
  navLinksTop: {
    color: theme.colors.gray[4],

    justifyContent: 'center',
    ['span']: {
      margin: '0px !important',
    },
    marginBottom: '50px',
  },
}));

const SideNav: React.FC = () => {
  const { user, logOut } = useAuth();
  const { classes } = useStyles();
  return (
    <Navbar
      width={{
        base: 100,
      }}
      height="100vh"
      p="xs"
      className={classes.navbar}
    >
      <Stack className={classes.mainStack} spacing="xl">
        <Stack className={classes.subStack}>
          <NavLink
            className={classes.navLinksTop}
            to="/"
            icon={
              <BackgroundImage
                src="logo.png"
                //style={{ height: '64px', width: '64px' }}
              >
                <Box sx={{ height: '64px', width: '64px' }}></Box>
              </BackgroundImage>
            }
          />
          <NavLink
            className={classes.navLinks}
            to="/"
            icon={<IconHome size={28} />}
          />

          <NavLink
            className={classes.navLinks}
            to="/game"
            icon={<IconBrandAppleArcade size={28} />}
          />

          <NavLink
            className={classes.navLinks}
            to="/leaderboard"
            icon={<IconAward size={28} />}
          />
        </Stack>

        <Stack className={classes.subStack}>
          <IconDoorExit
            size={28}
            className={classes.navLinks}
            onClick={() => {
              logOut(() => {
                console.log('out');
              });
            }}
            style={{ width: '100%' }}
          />
          <NavLink
            className={classes.navLinks}
            to="/profile"
            icon={
              <Avatar color={'cyan'} size={'lg'} avatarId={user.avatarId}>
                {user.name?.[0] || <IconUser />}
              </Avatar>
            }
          />
        </Stack>
      </Stack>
    </Navbar>
  );
};

export default SideNav;
