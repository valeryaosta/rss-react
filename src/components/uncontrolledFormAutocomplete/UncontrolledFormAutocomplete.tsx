import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks.ts';
import '../hookFormAutocomplete/HookFormAutocomplete.css';

interface UncontrolledFormAutocompleteProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

const UncontrolledFormAutocomplete = ({ inputRef }: UncontrolledFormAutocompleteProps) => {
  const countries = useAppSelector((state) => state.country.countries);
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    const searchValue = value.toLowerCase();
    return countries.filter((country) => country.toLowerCase().includes(searchValue));
  }, [value, countries]);

  const handleSelect = (country: string) => {
    setValue(country);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.value = country;
    }
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        placeholder='Choose country'
      />
      {isOpen && (
        <ul className='autocomplete-list'>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <li key={index} onMouseDown={() => handleSelect(country)}>
                {country}
              </li>
            ))
          ) : (
            <li className='autocomplete-no-options'>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default UncontrolledFormAutocomplete;
