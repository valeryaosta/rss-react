import React from 'react';
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useGetCharacterDetailsQuery, useGetEpisodesQuery } from '@/store/api';
import { EpisodeType } from '@/store/types';
import Image from 'next/image';
import styles from './CharacterDetail.module.css';

type CharacterDetailProps = {
  characterId: string;
};

const CharacterDetail = ({ characterId }: CharacterDetailProps) => {
  const router = useRouter();

  const {
    data: character,
    error: characterError,
    isLoading: isCharacterLoading,
  } = useGetCharacterDetailsQuery(characterId);
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
    <div className={styles['character-detail']}>
      <button onClick={() => router.push(`/?page=${router.query.page || '1'}&search=${router.query.search || ''}`)}>
        Back
      </button>
      <Image
        src={character.image}
        alt={character.name}
        className={styles['character-detail-image']}
        width={320}
        height={320}
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
          {character.origin.name}
        </p>
        <p>
          <strong>Last known location: </strong>
          {character.location.name}
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
