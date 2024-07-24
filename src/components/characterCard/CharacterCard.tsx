import React from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Link, useSearchParams } from 'react-router-dom';
import { setSelectedCharacter } from '../../store/slices/characterSlice';
import { CharacterDetailType } from '../../store/types';

type Props = {
  character: CharacterDetailType;
  getStatusColor: (status: string) => string;
};

const CharacterCard = ({ character, getStatusColor }: Props) => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  return (
    <Link
      key={character.id}
      to={`character/${character.id}?page=${searchParams.get('page') || '1'}`}
      className='character-card'
      onClick={() => dispatch(setSelectedCharacter(character))}
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
