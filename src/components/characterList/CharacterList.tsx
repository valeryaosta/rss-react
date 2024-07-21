import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';
import CharacterCard from '../characterCard/CharacterCard';
import { useGetCharactersQuery } from '../../store/api';
import { CharacterDetailType } from '../../store/types';
import './CharacterList.css';

type Props = {
  setCurrentPage: (page: number) => void;
};

const CharacterList = ({ setCurrentPage }: Props) => {
  const currentPage = useAppSelector((state) => state.characters.currentPage);
  const searchTerm = useAppSelector((state) => state.characters.searchTerm);

  const { data, error, isLoading } = useGetCharactersQuery({ page: currentPage, name: searchTerm });

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
    return <div className='error'>{<p>{error.toString()}</p> || <p>Some error occurred</p>}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='character-list'>
          {data?.results.map((character: CharacterDetailType) => (
            <CharacterCard key={character.id} character={character} getStatusColor={getStatusColor} />
          ))}
        </div>
      )}
      {data && <Pagination currentPage={+currentPage} setCurrentPage={setCurrentPage} totalPages={data.info.pages} />}
    </div>
  );
};

export default CharacterList;
