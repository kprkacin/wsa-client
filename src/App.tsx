import React, { useState, useEffect } from 'react';
import './App.css';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { CustomFonts, Shell } from './components';

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: 'Dosis, sans-serif',
          headings: {
            fontFamily: 'Dosis, sans-serif',
          },
          colorScheme,
          colors: {
            secondary: ['#ea638c'],
            primary: ['#e64980'],
            'light-dark': ['#190e4f'],
            dark: ['#03012c'],
            light: ['#f7f0f0'],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <CustomFonts />
          <Shell />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
