import { useState } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const isDetailPage = location.pathname.includes('/character/');

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className='searchbar-section'>
        <ButtonWithError />
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className='characters-wrapper'>
        <CharacterList searchTerm={searchTerm} currentPage={currentPage} setCurrentPage={handlePageChange} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
