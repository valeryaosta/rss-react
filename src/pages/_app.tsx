import { AppProps } from 'next/app';
import { ElementType } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import FallbackContent from '../components/fallbackContent/FallbackContent';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from '@/components/themeSwitcher/ThemeSwitcher';
import '../index.css';

type MyAppContentProps = {
  Component: ElementType;
  pageProps: Record<string, unknown>;
};

const MyAppContent = ({ Component, pageProps }: MyAppContentProps) => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary fallback={<FallbackContent />}>
        <ThemeSwitcher />
        <Component {...pageProps} />
      </ErrorBoundary>
    </div>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MyAppContent Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
