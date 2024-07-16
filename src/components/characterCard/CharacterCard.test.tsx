import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'alive',
  gender: 'men',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: {
    name: 'Earth (C-137)',
    url: '',
  },
  origin: {
    name: 'Earth (C-137)',
    url: '',
  },
  episode: ['S1 E2'],
  url: 'https://localhost:5173',
  created: '2021-11-11',
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'green';
    case 'dead':
      return 'red';
    default:
      return 'gray';
  }
};

describe('CharacterCard', () => {
  it('renders character information', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} getStatusColor={getStatusColor} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Last Known Location:')).toBeInTheDocument();
    expect(screen.getByText('First Seen In:')).toBeInTheDocument();
  });

  it('displays the correct status color', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} getStatusColor={getStatusColor} />
      </MemoryRouter>,
    );

    const statusIndicator = screen.getByText('Alive - Human').parentElement?.querySelector('.status-indicator');
    expect(statusIndicator).toHaveStyle('background-color: green');
  });
});
