import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks.ts';
import './HookFormAutocomplete.css';
import { UseFormTrigger } from 'react-hook-form';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  trigger?: UseFormTrigger<{
    country: string;
    email: string;
    password: string;
    name: string;
    age: number;
    confirmPassword: string;
    gender: string;
    terms: boolean;
    picture: FileList;
  }>;
}

const HookFormAutocomplete = ({ value = '', onChange, trigger }: AutocompleteProps) => {
  const countries = useAppSelector((state) => state.country.countries);
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    const searchValue = value.toLowerCase();
    return countries.filter((country) => country.toLowerCase().includes(searchValue));
  }, [value, countries]);

  const handleSelect = (country: string) => {
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div className='autocomplete'>
      <input
        type='text'
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsOpen(false);
          if (trigger) {
            trigger('country');
          }
        }}
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

export default HookFormAutocomplete;
