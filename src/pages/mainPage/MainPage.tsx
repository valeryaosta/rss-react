import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar';
import CharacterList from '../../components/characterList/CharacterList';
import ButtonWithError from '../../components/buttonWithBug/ButtonWithError';
import useLocalStorage from '../../hooks/useLocalStorage';
import './MainPage.css';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className='app-container'>
      <div className='searchbar-section'>
        <ButtonWithError />
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className='characters-wrapper'>
        <CharacterList searchTerm={searchTerm} currentPage={currentPage} setCurrentPage={handlePageChange} />
      </div>
    </div>
  );
};

export default MainPage;
