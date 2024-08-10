import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import Image from 'next/image';
import SearchIcon from '../../../public/search.svg';
import styles from './Searchbar.module.css';
import { setSearchTerm } from '@/store/slices/characterSlice.ts';

type Props = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.characters.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    const storedSearch = localStorage.getItem('searchTerm') || '';
    setLocalSearchTerm(storedSearch);
    dispatch(setSearchTerm(storedSearch));
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(localSearchTerm.trim());
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (value === '') {
      onSearch('');
      dispatch(setSearchTerm(''));
    }
  };

  return (
    <div className={styles['searchbar']}>
      <input
        type='search'
        value={localSearchTerm}
        onChange={handleInputChange}
        onInput={handleInput}
        className={styles['input']}
        placeholder='Type character name...'
      />
      <button onClick={handleSearch} disabled={!localSearchTerm.trim()} className={styles['search-btn']}>
        <Image src={SearchIcon} alt='search icon' className={styles['input-image']} width={15} height={15} />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
