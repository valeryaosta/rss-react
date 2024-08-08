import { useRouter } from 'next/router';
import Pagination from '../pagination/Pagination';
import CharacterCard from '../characterCard/CharacterCard';
import { CharacterDetailType } from '@/store/types';
import styles from './CharacterList.module.css';

type CharacterListProps = {
  characters: CharacterDetailType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CharacterList = ({ characters, currentPage, totalPages, onPageChange }: CharacterListProps) => {
  const router = useRouter();

  const handleSelectCharacter = (character: CharacterDetailType) => {
    router.push(`/?page=${router.query.page || '1'}&search=${router.query.search || ''}&characterId=${character.id}`);
  };

  return (
    <div>
      {characters && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={onPageChange} />}
      {characters && characters.length > 0 ? (
        <div className={styles['character-list']}>
          {characters.map((character) => (
            <div className={styles['character-container']} key={character.id}>
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
