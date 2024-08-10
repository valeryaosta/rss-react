'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/reduxHooks.ts';
import { setCurrentPage, setSearchTerm } from '@/store/slices/characterSlice.ts';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import SearchBar from '../components/searchbar/SearchBar.tsx';
import CharacterList from '../components/characterList/CharacterList.tsx';
import CharacterDetail from '@/components/character/CharacterDetail.tsx';
import Flyout from '../components/flyout/Flyout.tsx';
import Spinner from '../components/spinner/Spinner.tsx';
import { CharacterDetailType, EpisodeType } from '@/store/types.ts';
import styles from './layout.module.css';

type MainPageProps = {
  initialCharacters: CharacterDetailType[];
  initialCharacterDetail: CharacterDetailType | null;
  initialEpisodes: EpisodeType[] | null;
};

const MainPage = ({ initialCharacters, initialCharacterDetail, initialEpisodes }: MainPageProps) => {
  const [characters, setCharacters] = useState<CharacterDetailType[]>(initialCharacters);
  const [characterDetail, setCharacterDetail] = useState<CharacterDetailType | null>(initialCharacterDetail);
  const [episodes, setEpisodes] = useState<EpisodeType[]>(initialEpisodes || []);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPageState] = useState<number>(1);

  const router = useRouter();
  const searchParams = useSearchParams();
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
      setTotalPages(characterData.info.pages || 1);
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

    const characterIdFromParams = searchParams.get('characterId');
    if (characterIdFromParams && (!characterDetail || characterDetail.id !== characterIdFromParams)) {
      fetchCharacterDetail(characterIdFromParams);
    }
  }, [searchParams]);

  const handleSearch = (searchTerm: string) => {
    const queryString = `/?page=1&search=${encodeURIComponent(searchTerm)}`;
    router.push(queryString);
    dispatch(setSearchTerm(searchTerm));
    setStoredSearchTerm(searchTerm);
    setCurrentPageState(1);
  };

  const handlePageChange = (page: number) => {
    const search = searchParams.get('search') || '';
    const characterId = searchParams.get('characterId');
    const queryString = `/?page=${page.toString()}&search=${encodeURIComponent(search)}${
      characterId ? `&characterId=${characterId}` : ''
    }`;
    router.push(queryString);
    dispatch(setCurrentPage(page));
    setCurrentPageState(page);
  };

  const isDetailPage = searchParams.get('characterId') !== null;

  return (
    <div className={`app-container ${isDetailPage ? 'detail-view' : ''}`}>
      <div className={styles['searchbar-section']}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles['content-section']}>
        <div className={styles['characters-wrapper']}>
          <CharacterList
            characters={characters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoadingCharacters}
          />
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
