import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';
import CharacterCard, { Character } from '../characterCard/CharacterCard';
import { getCharacters } from '../../api/api';
import './CharacterList.css';

type Props = {
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const CharacterList = ({ searchTerm, currentPage, setCurrentPage }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCharacters(currentPage, searchTerm);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError('Failed to fetch characters');
      }
      setIsLoading(false);
    };

    fetchCharacters();
  }, [currentPage, searchTerm]);

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'green';
      case 'dead':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (error) {
    return <div className='error'>{<p>error</p> || <p>Some error occurred</p>}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='character-list'>
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} getStatusColor={getStatusColor} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default CharacterList;
