import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import SearchBar from '../../components/searchbar/SearchBar';
import CharacterList from '../../components/characterList/CharacterList';
import ButtonWithError from '../../components/buttonWithBug/ButtonWithError';
import Flyout from '../../components/flyout/Flyout';
import { setCurrentPage, setSearchTerm } from '../../store/slices/characterSlice';
import './MainPage.css';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const initialPage = Number(searchParams.get('page')) || 1;
    dispatch(setCurrentPage(initialPage));
  }, [searchParams, dispatch]);

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
    dispatch(setCurrentPage(1));
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    setSearchParams({ page: page.toString() });
  };

  const isDetailPage = location.pathname.includes('/character/');

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className='searchbar-section'>
        <ButtonWithError />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className='characters-wrapper'>
        <CharacterList setCurrentPage={handlePageChange} />
        <Outlet />
      </div>
      <Flyout />
    </div>
  );
};

export default MainPage;
