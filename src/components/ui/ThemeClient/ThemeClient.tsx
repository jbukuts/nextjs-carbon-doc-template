'use client';

import { ThemeProvider } from 'next-themes';
const THEME_MAP = { light: 'cds--white', dark: 'cds--g100' };

interface ThemeClientProps {
  children: React.ReactNode;
}

export default function ThemeClient(props: ThemeClientProps) {
  const { children } = props;

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute='class'
      value={THEME_MAP}
      themes={Object.keys(THEME_MAP)}>
      {children}
    </ThemeProvider>
  );
}
