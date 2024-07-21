import React, { useState, useEffect } from 'react';
import SearchIcon from '../../assets/search.svg';
import './Searchbar.css';

type Props = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ searchTerm, onSearch }: Props) => {
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
      />
      <button onClick={handleSearch} disabled={!localSearchTerm.trim()} className='search-btn'>
        <img src={SearchIcon} alt='search icon' />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
