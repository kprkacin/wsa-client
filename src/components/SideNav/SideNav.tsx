import React, { useState } from 'react';
import { Box, Group, Navbar, Stack, Transition } from '@mantine/core';
import { ThemeToggle } from '../ThemeToggle';
import NavLink from '../NavLink';
import { IconAbacus, IconArrowBack, IconChess } from '@tabler/icons';

const SideNav: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <Navbar
      width={{
        base: show ? 300 : 50,
      }}
      height="100vh"
      p="xs"
      sx={{
        overflow: 'hidden',
        transition: 'width 1000ms ease',
      }}
    >
      <Stack>
        <IconChess size={16} />

        <NavLink
          to="/unknown"
          icon={<IconAbacus />}
          label={show ? 'First Route' : ''}
        />

        <NavLink
          to="/unknown2"
          icon={<IconAbacus />}
          label={show ? 'Second Route' : ''}
        />

        <NavLink
          to="/unknown3"
          icon={<IconAbacus />}
          label={show ? 'Third Route' : ''}
        />

        <NavLink
          to="/unknown4"
          icon={<IconAbacus />}
          label={show ? 'Fourth Route' : ''}
        />

        <IconArrowBack size={32} onClick={() => setShow((old) => !old)} />
        <ThemeToggle
          sx={(theme) => ({
            marginBottom: theme.spacing.xl,
          })}
        />
      </Stack>
    </Navbar>
  );
};

export default SideNav;
