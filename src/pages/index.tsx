import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCurrentPage, setSearchTerm } from '../store/slices/characterSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchBar from '../components/searchbar/SearchBar';
import CharacterList from '../components/characterList/CharacterList';
import ButtonWithError from '../components/buttonWithBug/ButtonWithError';
import CharacterDetail from '@/components/character/CharacterDetail';
import Flyout from '../components/flyout/Flyout';
import { CharacterDetailType, EpisodeType } from '@/store/types';
import styles from './index.module.css';

type MainPageProps = {
  characters: CharacterDetailType[];
  currentPage: number;
  totalPages: number;
  characterDetail?: CharacterDetailType;
  episodes?: EpisodeType[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = '1', search = '', characterId } = context.query;

  const characterRes = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${search}`);
  const characterData = await characterRes.json();

  let characterDetail = null;
  let episodes = null;

  if (characterId) {
    const characterDetailRes = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    characterDetail = await characterDetailRes.json();

    const episodeIds = characterDetail.episode.map((url: string) => url.split('/').pop()).join(',');
    const episodesRes = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
    episodes = await episodesRes.json();

    episodes = Array.isArray(episodes) ? episodes : [episodes];
  }

  return {
    props: {
      characters: characterData.results || [],
      currentPage: parseInt(page as string, 10),
      totalPages: characterData.info?.pages || 0,
      characterDetail: characterDetail || null,
      episodes: episodes || null,
    },
  };
};

const MainPage = ({ characters, currentPage, totalPages, characterDetail, episodes }: MainPageProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    const initialPage = Number(router.query.page) || 1;
    dispatch(setCurrentPage(initialPage));
    dispatch(setSearchTerm(storedSearchTerm));
  }, [dispatch, router.query.page, storedSearchTerm]);

  const handleSearch = (searchTerm: string) => {
    const query = { page: '1', search: searchTerm, characterId: router.query.characterId as string };
    router.push({ pathname: '/', query });
    dispatch(setSearchTerm(searchTerm));
    setStoredSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    const query = {
      page: page.toString(),
      search: (router.query.search as string) || '',
      characterId: router.query.characterId as string,
    };
    router.push({ pathname: '/', query });
    dispatch(setCurrentPage(page));
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
          <CharacterList
            characters={characters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isDetailPage && characterDetail && episodes && (
          <div className={styles['character-detail-wrapper']}>
            <CharacterDetail character={characterDetail} episodes={episodes} />
          </div>
        )}
      </div>
      <Flyout />
    </div>
  );
};

export default MainPage;
