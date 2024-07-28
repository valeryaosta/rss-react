import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import FallbackContent from './components/fallbackContent/FallbackContent';
import MainPage from './pages/mainPage/MainPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import CharacterDetail from './components/characterDetail/CharacterDetail';
import { useTheme } from './contexts/ThemeContext';
import Light from '../src/assets/ligth-mode.png';
import Dark from '../src/assets/dark-mode.png';
import './App.css';

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary fallback={<FallbackContent />}>
        <Router>
          <button onClick={toggleTheme} className='theme-toggle-btn'>
            Theme {theme === 'light' ? <img src={Light} alt='Light mode' /> : <img src={Dark} alt='Dark mode' />}
          </button>
          <Routes>
            <Route path='/' element={<MainPage />}>
              <Route path='character/:characterId' element={<CharacterDetail />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
