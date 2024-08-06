import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useRouter } from 'next/router';
import SearchBar from '../components/searchbar/SearchBar';
import CharacterList from '../components/characterList/CharacterList';
import ButtonWithError from '../components/buttonWithBug/ButtonWithError';
import Flyout from '../components/flyout/Flyout';
import CharacterDetail from '@/components/character/CharacterDetail';
import useLocalStorage from '../hooks/useLocalStorage';
import { setCurrentPage, setSearchTerm } from '../store/slices/characterSlice';
import styles from './index.module.css';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    const initialPage = Number(router.query.page) || 1;
    dispatch(setCurrentPage(initialPage));
    dispatch(setSearchTerm(storedSearchTerm));
  }, [router.query.page, storedSearchTerm, dispatch]);

  const handleSearch = (searchTerm: string) => {
    const { characterId } = router.query;
    const query: Record<string, string> = { page: '1', search: searchTerm };
    if (characterId) {
      query.characterId = characterId as string;
    }
    router.push({ pathname: '/', query });
    setStoredSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    const { search, characterId } = router.query;
    const query: Record<string, string> = { page: page.toString(), search: search as string };
    if (characterId) {
      query.characterId = characterId as string;
    }
    router.push({ pathname: '/', query });
  };

  const isDetailPage = router.query.characterId !== undefined;

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className={styles['searchbar-section']}>
        <ButtonWithError />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles['content-section']}>
        <div className={styles['characters-wrapper']}>
          <CharacterList setCurrentPage={handlePageChange} />
        </div>
        {isDetailPage && (
          <div className={styles['character-detail-wrapper']}>
            <CharacterDetail characterId={router.query.characterId as string} />
          </div>
        )}
      </div>
      <Flyout />
    </div>
  );
};

export default MainPage;
