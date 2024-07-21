import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterList from './CharacterList';
import * as api from '../../api/api';

jest.mock('../../api/api');

const mockGetCharacters = api.getCharacters as jest.MockedFunction<typeof api.getCharacters>;

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
];

describe('CharacterList', () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
    mockGetCharacters.mockClear();
  });

  it('renders a list of characters', async () => {
    mockGetCharacters.mockResolvedValueOnce({
      results: characters,
      info: {
        pages: 1,
      },
    });

    render(
      <MemoryRouter>
        <CharacterList searchTerm='' currentPage={1} setCurrentPage={mockSetCurrentPage} />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('displays loading spinner while fetching data', () => {
    mockGetCharacters.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <CharacterList searchTerm='' currentPage={1} setCurrentPage={mockSetCurrentPage} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message when fetching data fails', async () => {
    mockGetCharacters.mockRejectedValueOnce(new Error('Failed to fetch characters'));

    render(
      <MemoryRouter>
        <CharacterList searchTerm='' currentPage={1} setCurrentPage={mockSetCurrentPage} />
      </MemoryRouter>,
    );

    expect(await screen.findByText('error')).toBeInTheDocument();
  });
});
