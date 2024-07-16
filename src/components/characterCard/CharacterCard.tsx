import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export type Character = {
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
  character: Character;
  getStatusColor: (status: string) => string;
};

const CharacterCard = ({ character, getStatusColor }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      key={character.id}
      to={`character/${character.id}?page=${searchParams.get('page') || '1'}`}
      className='character-card'
    >
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
    </Link>
  );
};

export default CharacterCard;
