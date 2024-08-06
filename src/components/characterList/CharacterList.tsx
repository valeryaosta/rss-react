import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';
import CharacterCard from '../characterCard/CharacterCard';
import { useGetCharactersQuery } from '@/store/api';
import { addItem, removeItem } from '@/store/slices/characterSlice';
import { CharacterDetailType } from '@/store/types';
import styles from './CharacterList.module.css';

type Props = {
  setCurrentPage: (page: number) => void;
};

const CharacterList = ({ setCurrentPage }: Props) => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.characters.currentPage);
  const searchTerm = useAppSelector((state) => state.characters.searchTerm);
  const selectedItems = useAppSelector((state) => state.characters.selectedItems);

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

  const handleSelectItem = (character: CharacterDetailType) => {
    const isSelected = selectedItems.some((item) => item.id === character.id);
    if (isSelected) {
      dispatch(removeItem(character.id));
    } else {
      dispatch(addItem(character));
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
        <div className={styles['character-list']}>
          {data?.results.map((character: CharacterDetailType) => (
            <div className={styles['character-container']} key={character.id}>
              <input
                type='checkbox'
                checked={selectedItems.some((item) => item.id === character.id)}
                onChange={() => {
                  handleSelectItem(character);
                }}
                className={styles['character-checkbox']}
              />
              <CharacterCard character={character} getStatusColor={getStatusColor} />
            </div>
          ))}
        </div>
      )}
      {data && <Pagination currentPage={+currentPage} setCurrentPage={setCurrentPage} totalPages={data.info.pages} />}
    </div>
  );
};

export default CharacterList;
