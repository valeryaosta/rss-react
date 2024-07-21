import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { useGetCharacterDetailsQuery, useGetEpisodesQuery } from '../../store/api';
import { EpisodeType } from '../../store/types';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const navigate = useNavigate();

  const {
    data: character,
    error: characterError,
    isLoading: isCharacterLoading,
  } = useGetCharacterDetailsQuery(characterId as string);
  const episodeUrls = character?.episode || [];
  const { data: episodes, error: episodesError, isLoading: isEpisodesLoading } = useGetEpisodesQuery(episodeUrls);

  if (isCharacterLoading || isEpisodesLoading) {
    return <Spinner />;
  }

  if (characterError || episodesError) {
    return <p>{characterError?.toString() || episodesError?.toString() || 'Some error occurred'}</p>;
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
        <div className='episodes'>
          <h2>Episodes:</h2>
          {episodes && episodes.length > 0 ? (
            <ul>
              {episodes.map((episode: EpisodeType) => (
                <li key={episode.id}>
                  <strong>{episode.episode}</strong> - {episode.name} ({episode.air_date})
                </li>
              ))}
            </ul>
          ) : (
            <p>No episodes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
