import React from 'react';
import Image from 'next/image';
import { CharacterDetailType } from '@/store/types';
import styles from '../characterList/CharacterList.module.css';

type CharacterCardProps = {
  character: CharacterDetailType;
  onSelect: () => void;
};

const CharacterCard = ({ character, onSelect }: CharacterCardProps) => {
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

  return (
    <div key={character.id} className={styles['character-card']} onClick={onSelect} role='link'>
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
