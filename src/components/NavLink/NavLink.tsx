import React, { ReactElement } from 'react';
import {
  Box,
  createStyles,
  Group,
  Navbar,
  NavLink as MNavLink,
} from '@mantine/core';
import { ThemeToggle } from '../ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
const useStyles = (label?: string) =>
  createStyles((theme) => ({
    body: {
      display: label ? 'flex' : 'none',
    },
  }));

type Props = {
  to: string;
  icon?: ReactElement;
  label?: string;
};

const NavLink: React.FC<Props> = (props) => {
  const { to, icon, label } = props;
  const location = useLocation();
  const { classes } = useStyles(label)();

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
        padding: 0,
        alignItems: 'center',
      }}
      classNames={{
        body: classes.body,
      }}
    />
  );
};

export default NavLink;
