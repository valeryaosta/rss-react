import React from 'react';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useRouter } from 'next/router';
import { setSelectedCharacter } from '@/store/slices/characterSlice';
import { CharacterDetailType } from '@/store/types';
import Image from 'next/image';
import styles from '../characterList/CharacterList.module.css';

type Props = {
  character: CharacterDetailType;
  getStatusColor: (status: string) => string;
};

const CharacterCard = ({ character, getStatusColor }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(setSelectedCharacter(character));
    router.push(`/character/${character.id}?page=${router.query.page || '1'}`);
  };

  return (
    <div key={character.id} className={styles['character-card']} onClick={handleClick} role='link'>
      <Image
        src={character.image}
        alt={character.name}
        className={styles['character-card-image']}
        width={100}
        height={320}
      />
      <div className={styles['character-info']}>
        <p>{character.name}</p>
        <div className={styles['status']}>
          <span
            className={styles['status-indicator']}
            style={{ backgroundColor: getStatusColor(character.status) }}
          ></span>
          {character.status} - {character.species}
        </div>
        <p className={styles['specific-text']}>
          <span className={styles['specific']}>Last Known Location: </span>
          {character.location?.name}
        </p>
        <p className={styles['specific-text']}>
          <span className={styles['specific']}>First Seen In: </span>
          {character.origin?.name}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
