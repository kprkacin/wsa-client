import {
  ActionIcon,
  Box,
  DefaultProps,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons';

const ThemeToggle = (props: DefaultProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      {...props}
      sx={(theme) => ({
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <ActionIcon
        variant="default"
        onClick={() => toggleColorScheme()}
        size={30}
      >
        {colorScheme === 'dark' ? (
          <IconSun size={16} />
        ) : (
          <IconMoonStars size={16} />
        )}
      </ActionIcon>
    </Box>
  );
};

export default ThemeToggle;
