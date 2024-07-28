import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../../store/slices/characterSlice';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        characters: characterReducer,
      },
      preloadedState: {
        characters: {
          currentPage: 1,
          searchTerm: 'initial term',
          selectedCharacter: null,
          selectedItems: [],
        },
      },
    });

    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders with initial searchTerm from Redux', () => {
    renderWithProviders(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    expect(inputElement.value).toBe('initial term');
  });

  it('updates local search term on input change', () => {
    renderWithProviders(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new term' } });
    expect(inputElement.value).toBe('new term');
  });

  it('calls onSearch with trimmed search term on button click', () => {
    renderWithProviders(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'new term ' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('new term');
  });

  it('disables search button when input is empty', () => {
    renderWithProviders(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: '' } });
    expect(buttonElement).toBeDisabled();
  });
});
