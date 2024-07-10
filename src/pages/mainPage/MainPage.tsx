import SearchBar from '../../components/searchbar/SearchBar';
import CharacterList from '../../components/characterList/CharacterList';
import ButtonWithError from '../../components/buttonWithBug/ButtonWithError';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import './MainPage.css';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  return (
    <div className='app-container'>
      <div className='searchbar-section'>
        <ButtonWithError />
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className='characters-wrapper'>
        <CharacterList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default MainPage;
