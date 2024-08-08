import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CharacterDetailType, EpisodeType } from '@/store/types';
import styles from './CharacterDetail.module.css';

type CharacterDetailProps = {
  character: CharacterDetailType;
  episodes: EpisodeType[];
};

const CharacterDetail = ({ character, episodes }: CharacterDetailProps) => {
  const router = useRouter();

  return (
    <div className={styles['character-detail']}>
      <button onClick={() => router.push(`/?page=${router.query.page || '1'}&search=${router.query.search || ''}`)}>
        Back
      </button>
      <Image
        src={character.image}
        alt={character.name}
        className={styles['character-detail-image']}
        width={250}
        height={250}
      />
      <div className={styles['character-info']}>
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
          {character.origin?.name || 'not indicated'}
        </p>
        <p>
          <strong>Last known location: </strong>
          {character.location?.name || 'not indicated'}
        </p>
        <div className={styles['episodes']}>
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
