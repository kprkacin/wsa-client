import React, { useState } from 'react';
import { Box, Group, Navbar, Stack, Transition } from '@mantine/core';
import { ThemeToggle } from '../ThemeToggle';
import NavLink from '../NavLink';
import {
  IconAbacus,
  IconArrowBack,
  IconArrowLeft,
  IconArrowRight,
  IconChess,
  IconGoGame,
  IconUser,
} from '@tabler/icons';
import { useAuth } from '../../services/auth/AuthProvider';
import { Avatar } from '../Avatar';

const SideNav: React.FC = () => {
  const [show, setShow] = useState(false);

  const { user } = useAuth();
  return (
    <Navbar
      width={{
        base: 75,
      }}
      height="100vh"
      p="xs"
      sx={(theme) => ({
        overflow: 'hidden',
        transition: 'width 500ms ease',
        backgroundColor: theme.colors.gray[0],
        border: 0,
        '&:hover': {
          width: 250,
        },
      })}
    >
      <Stack>
        <IconChess size={24} />

        <NavLink
          to="/"
          icon={<IconAbacus size={24} />}
          label={show ? 'First Route' : ''}
        />

        <NavLink
          to="/game"
          icon={<IconGoGame size={24} />}
          label={show ? 'Game' : ''}
        />

        <NavLink
          to="/leaderboard"
          icon={<IconGoGame size={24} />}
          label={show ? 'Leaderboard' : ''}
        />

        {show ? (
          <IconArrowLeft size={24} onClick={() => setShow((old) => !old)} />
        ) : (
          <IconArrowRight size={24} onClick={() => setShow((old) => !old)} />
        )}

        <NavLink
          to="/profile"
          icon={
            <Avatar color={'cyan'} size={'lg'}>
              {user.name?.[0] || <IconUser />}
            </Avatar>
          }
          label={show ? 'Fourth Route' : ''}
        />
      </Stack>
    </Navbar>
  );
};

export default SideNav;
