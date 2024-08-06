// import { useEffect } from 'react';
// import { useAppDispatch } from '@/hooks/reduxHooks';
// import { useRouter } from 'next/router';
// import SearchBar from '../components/searchbar/SearchBar';
// import CharacterList from '../components/characterList/CharacterList';
// import ButtonWithError from '../components/buttonWithBug/ButtonWithError';
// import Flyout from '../components/flyout/Flyout';
// import useLocalStorage from '../hooks/useLocalStorage';
// import { setCurrentPage, setSearchTerm } from '../store/slices/characterSlice';
// import styles from './index.module.css';
// import CharacterDetail from '@/components/character/CharacterDetail.tsx';
//
// const MainPage = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage('searchTerm', '');
//
//   useEffect(() => {
//     const initialPage = Number(router.query.page) || 1;
//     dispatch(setCurrentPage(initialPage));
//     dispatch(setSearchTerm(storedSearchTerm));
//   }, [router.query.page, storedSearchTerm, dispatch]);
//
//   const handleSearch = (searchTerm: string) => {
//     dispatch(setSearchTerm(searchTerm));
//     dispatch(setCurrentPage(1));
//     router.push(`/?page=1&search=${searchTerm}`);
//     setStoredSearchTerm(searchTerm);
//   };
//
//   const handlePageChange = (page: number) => {
//     dispatch(setCurrentPage(page));
//     router.push(`/?page=${page}&search=${router.query.search || ''}&characterId=${router.query.characterId || ''}`);
//   };
//
//   const isDetailPage = router.query.characterId !== undefined;
//
//   return (
//     <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
//       <div className={styles['searchbar-section']}>
//         <ButtonWithError />
//         <SearchBar onSearch={handleSearch} />
//       </div>
//       <div className={styles['characters-wrapper']}>
//         <CharacterList setCurrentPage={handlePageChange} />
//         {isDetailPage && <CharacterDetail characterId={router.query.characterId as string} />}
//       </div>
//       <Flyout />
//     </div>
//   );
// };
//
// export default MainPage;

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
    dispatch(setSearchTerm(searchTerm));
    dispatch(setCurrentPage(1));
    router.push(`/?page=1&search=${searchTerm}`);
    setStoredSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    router.push(`/?page=${page}&search=${router.query.search || ''}&characterId=${router.query.characterId || ''}`);
  };

  const isDetailPage = router.query.characterId !== undefined;

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className={styles['searchbar-section']}>
        <ButtonWithError />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles['characters-wrapper']}>
        <CharacterList setCurrentPage={handlePageChange} />
        {isDetailPage && <CharacterDetail characterId={router.query.characterId as string} />}
      </div>
      <Flyout />
    </div>
  );
};

export default MainPage;
