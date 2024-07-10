import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ButtonWithError from './components/buttonWithBug/ButtonWithError';
import FallbackContent from './components/fallbackContent/FallbackContent';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
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
