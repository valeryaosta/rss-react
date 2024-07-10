import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
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
};

const CharacterList = ({ searchTerm }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters(searchTerm);
  }, [searchTerm]);

  const fetchCharacters = async (searchTerm: string = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCharacters(1, searchTerm);
      setCharacters(data.results);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch characters');
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error || <div>Some error occurred</div>}</p>;
  }

  return (
    <div className='character-list'>
      {characters.map((character) => (
        <div key={character.id} className='character-card'>
          <img src={character.image} alt={character.name} />
          <div className='character-info'>
            <p>{character.name}</p>
            <div className='status'>
              <span className='status-indicator' style={{ backgroundColor: getStatusColor(character.status) }}></span>
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
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
