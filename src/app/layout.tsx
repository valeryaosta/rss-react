'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import FallbackContent from '../components/fallbackContent/FallbackContent';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from '@/components/themeSwitcher/ThemeSwitcher';
import '../index.css';

interface LayoutProps {
  children: ReactNode;
}

function MyAppContent({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary fallback={<FallbackContent />}>
        <ThemeSwitcher />
        {children}
      </ErrorBoundary>
    </div>
  );
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <MyAppContent>{children}</MyAppContent>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
