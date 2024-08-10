import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination/Pagination';
import CharacterCard from '../characterCard/CharacterCard';
import { CharacterDetailType } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addItem, removeItem, setSelectedCharacter } from '@/store/slices/characterSlice';
import Spinner from '../spinner/Spinner';
import styles from './CharacterList.module.css';

type CharacterListProps = {
  characters: CharacterDetailType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

const CharacterList = ({ characters, currentPage, totalPages, onPageChange, isLoading }: CharacterListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.characters.selectedItems);

  const handleSelectCharacter = (character: CharacterDetailType) => {
    dispatch(setSelectedCharacter(character));
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    router.push(`/?page=${page}&search=${search}&characterId=${character.id}`);
  };

  const handleSelectItem = (character: CharacterDetailType) => {
    const isSelected = selectedItems.some((item) => item.id === character.id);
    if (isSelected) {
      dispatch(removeItem(character.id));
    } else {
      dispatch(addItem(character));
    }
  };

  return (
    <div>
      {characters && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={onPageChange} />}
      {isLoading ? (
        <Spinner />
      ) : characters && characters.length > 0 ? (
        <div className={styles['character-list']}>
          {characters.map((character) => (
            <div className={styles['character-container']} key={character.id}>
              <input
                type='checkbox'
                checked={selectedItems.some((item) => item.id === character.id)}
                onChange={() => {
                  handleSelectItem(character);
                }}
                className={styles['character-checkbox']}
              />
              <CharacterCard character={character} onSelect={() => handleSelectCharacter(character)} />
            </div>
          ))}
        </div>
      ) : (
        <p>No characters found</p>
      )}
    </div>
  );
};

export default CharacterList;
