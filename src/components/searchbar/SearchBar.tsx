import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks.ts';

import SearchIcon from '../../assets/search.svg';
import './Searchbar.css';

type Props = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const searchTerm = useAppSelector((state) => state.characters.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

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
    }
  };

  return (
    <div className='searchbar'>
      <input
        type='search'
        value={localSearchTerm}
        onChange={handleInputChange}
        onInput={handleInput}
        className='input'
        placeholder='Type character name...'
      />
      <button onClick={handleSearch} disabled={!localSearchTerm.trim()} className='search-btn'>
        <img src={SearchIcon} alt='search icon' />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
