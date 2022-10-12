import React, { ReactElement } from 'react';
import { Box, Group, Navbar, NavLink as MNavLink } from '@mantine/core';
import { ThemeToggle } from '../ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
type Props = {
  to: string;
  icon?: ReactElement;
  label?: string;
};

const NavLink: React.FC<Props> = (props) => {
  const { to, icon, label } = props;
  const location = useLocation();

  return (
    <MNavLink
      label={label}
      component={Link}
      icon={icon}
      to={to}
      active={location.pathname === to}
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    />
  );
};

export default NavLink;
