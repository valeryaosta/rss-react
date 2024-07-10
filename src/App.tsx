import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import FallbackContent from './components/fallbackContent/FallbackContent';
import MainPage from './pages/mainPage/MainPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';

const App = () => {
  return (
    <ErrorBoundary fallback={<FallbackContent />}>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
