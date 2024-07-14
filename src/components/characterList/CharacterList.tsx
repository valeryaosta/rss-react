import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';
import { getCharacters } from '../../api/api';
import './CharacterList.css';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

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
  const [searchParams] = useSearchParams();

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
            <Link
              key={character.id}
              to={`character/${character.id}?page=${searchParams.get('page') || '1'}`}
              className='character-card'
            >
              <img src={character.image} alt={character.name} />
              <div className='character-info'>
                <p>{character.name}</p>
                <div className='status'>
                  <span
                    className='status-indicator'
                    style={{ backgroundColor: getStatusColor(character.status) }}
                  ></span>
                  {character.status} - {character.species}
                </div>
                <p className='specific-text'>
                  <span className='specific'>Last Known Location: </span>
                  {character.location?.name}
                </p>
                <p className='specific-text'>
                  <span className='specific'>First Seen In: </span>
                  {character.origin?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
};

export default CharacterList;
