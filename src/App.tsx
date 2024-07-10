import { useState, useEffect } from 'react';
import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ButtonWithError from './components/buttonWithBug/ButtonWithError';
import FallbackContent from './components/fallbackContent/FallbackContent';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => localStorage.getItem('searchTerm') || '');

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      localStorage.removeItem('searchTerm');
    }
  };

  return (
    <ErrorBoundary fallback={<FallbackContent />}>
      <div className='app-container'>
        <div className='searchbar-section'>
          <ButtonWithError />
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <div className='characters-wrapper'>
          <CharacterList searchTerm={searchTerm} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
