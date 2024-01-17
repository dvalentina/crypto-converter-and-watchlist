'use client';

import { ThemeProvider } from 'styled-components';

import theme from '@/themes';

function ThemeClient({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeClient;
