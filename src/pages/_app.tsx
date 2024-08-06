import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import FallbackContent from '../components/fallbackContent/FallbackContent';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from '@/components/themeSwitcher/ThemeSwitcher';
import '../index.css';

const MyAppContent = ({ Component, pageProps }: AppProps) => {
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
        <MyAppContent Component={Component} {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
