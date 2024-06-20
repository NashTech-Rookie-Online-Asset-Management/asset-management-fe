'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <ProgressBar
        height="4px"
        color="#2563eb"
        options={{ showSpinner: false }}
        stopDelay={1000}
        shallowRouting
      />
    </NextThemesProvider>
  );
}
