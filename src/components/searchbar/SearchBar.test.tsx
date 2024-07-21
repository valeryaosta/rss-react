import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  it('renders with initial searchTerm', () => {
    render(<SearchBar searchTerm='initial term' onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    expect(inputElement.value).toBe('initial term');
  });

  it('updates local search term on input change', () => {
    render(<SearchBar searchTerm='initial term' onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new term' } });
    expect(inputElement.value).toBe('new term');
  });

  it('calls onSearch with trimmed search term on button click', () => {
    render(<SearchBar searchTerm='initial term' onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'new term ' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('new term');
  });

  it('disables search button when input is empty', () => {
    render(<SearchBar searchTerm='' onSearch={mockOnSearch} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeDisabled();
  });
});
