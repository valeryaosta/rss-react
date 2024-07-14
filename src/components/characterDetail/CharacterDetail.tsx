import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { getCharacterDetails } from '../../api/api';
import './CharacterDetail.css';

type CharacterDetailProps = {
  id: string;
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

const CharacterDetail = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<CharacterDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCharacterDetails(characterId as string);
        setCharacter(data);
      } catch (error) {
        setError('Failed to fetch character details');
      }
      setIsLoading(false);
    };

    fetchCharacter();
  }, [characterId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error || <div>Some error occurred</div>}</p>;
  }

  if (!character) {
    return null;
  }

  return (
    <div className='character-detail'>
      <button onClick={() => navigate(`/?page=${currentPage}`)}>Back</button>
      <img src={character.image} alt={character.name} />
      <div className='character-info'>
        <h1>{character.name}</h1>
        <p>
          <strong>Status: </strong>
          {character.status}
        </p>
        <p>
          <strong>Species: </strong>
          {character.species}
        </p>
        <p>
          <strong>Gender: </strong>
          {character.gender}
        </p>
        <p>
          <strong>Origin: </strong>
          {character.origin.name}
        </p>
        <p>
          <strong>Last known location: </strong>
          {character.location.name}
        </p>
      </div>
    </div>
  );
};

export default CharacterDetail;
