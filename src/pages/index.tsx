import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setCurrentPage, setSearchTerm } from '@/store/slices/characterSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchBar from '../components/searchbar/SearchBar';
import CharacterList from '../components/characterList/CharacterList';
import CharacterDetail from '@/components/character/CharacterDetail';
import Flyout from '../components/flyout/Flyout';
import Spinner from '../components/spinner/Spinner';
import { CharacterDetailType, EpisodeType } from '@/store/types';
import styles from './index.module.css';

type MainPageProps = {
  initialCharacters: CharacterDetailType[];
  currentPage: number;
  totalPages: number;
  initialCharacterDetail: CharacterDetailType | null;
  initialEpisodes: EpisodeType[] | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = '1', search = '', characterId } = context.query;

  const characterRes = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${search}`);
  const characterData = await characterRes.json();

  let characterDetail: CharacterDetailType | null = null;
  let episodes: EpisodeType[] | null = null;

  if (characterId) {
    const characterDetailRes = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    characterDetail = await characterDetailRes.json();

    if (characterDetail && characterDetail.episode.length > 0) {
      const episodeIds = characterDetail.episode.map((url: string) => url.split('/').pop()).join(',');
      const episodesRes = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
      const fetchedEpisodes = await episodesRes.json();

      episodes = Array.isArray(fetchedEpisodes) ? fetchedEpisodes : [fetchedEpisodes];
    }
  }

  return {
    props: {
      initialCharacters: characterData.results || [],
      currentPage: parseInt(page as string, 10),
      totalPages: characterData.info?.pages || 0,
      initialCharacterDetail: characterDetail,
      initialEpisodes: episodes,
    },
  };
};

const MainPage = ({
  initialCharacters,
  currentPage,
  totalPages,
  initialCharacterDetail,
  initialEpisodes,
}: MainPageProps) => {
  const [characters, setCharacters] = useState<CharacterDetailType[]>(initialCharacters);
  const [characterDetail, setCharacterDetail] = useState<CharacterDetailType | null>(initialCharacterDetail);
  const [episodes, setEpisodes] = useState<EpisodeType[]>(initialEpisodes || []);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoadingCharacters(true);
      const characterRes = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${storedSearchTerm}`,
      );
      const characterData = await characterRes.json();
      setCharacters(characterData.results || []);
      setIsLoadingCharacters(false);
    };

    fetchCharacters();
  }, [currentPage, storedSearchTerm]);

  useEffect(() => {
    const fetchCharacterDetail = async (characterId: string) => {
      setIsLoadingDetail(true);
      const characterDetailRes = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const characterDetail = await characterDetailRes.json();

      const episodeIds = characterDetail.episode.map((url: string) => url.split('/').pop()).join(',');
      const episodesRes = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
      const episodes = await episodesRes.json();

      setCharacterDetail(characterDetail);
      setEpisodes(Array.isArray(episodes) ? episodes : [episodes]);
      setIsLoadingDetail(false);
    };

    if (router.query.characterId) {
      fetchCharacterDetail(router.query.characterId as string);
    }
  }, [router.query.characterId]);

  const handleSearch = (searchTerm: string) => {
    const query = { page: '1', search: searchTerm };
    router.push({ pathname: '/', query });
    dispatch(setSearchTerm(searchTerm));
    setStoredSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    const query = { page: page.toString(), search: (router.query.search as string) || '' };
    router.push({ pathname: '/', query });
    dispatch(setCurrentPage(page));
  };

  const isDetailPage = router.query.characterId !== undefined;

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className={styles['searchbar-section']}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles['content-section']}>
        <div className={styles['characters-wrapper']}>
          {isLoadingCharacters ? (
            <Spinner />
          ) : (
            <CharacterList
              characters={characters}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {isDetailPage && (
          <div className={styles['character-detail-wrapper']}>
            {isLoadingDetail ? (
              <Spinner />
            ) : (
              characterDetail && episodes && <CharacterDetail character={characterDetail} episodes={episodes} />
            )}
          </div>
        )}
      </div>
      <Flyout />
    </div>
  );
};

export default MainPage;
