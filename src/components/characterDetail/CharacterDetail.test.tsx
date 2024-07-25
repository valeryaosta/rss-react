import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from './CharacterDetail';
import MainPage from '../../pages/mainPage/MainPage';
import { useGetCharacterDetailsQuery, useGetEpisodesQuery } from '../../store/api';
import { CharacterDetailType, EpisodeType } from '../../store/types';

jest.mock('../../store/api');

const mockUseGetCharacterDetailsQuery = useGetCharacterDetailsQuery as jest.MockedFunction<
  typeof useGetCharacterDetailsQuery
>;
const mockUseGetEpisodesQuery = useGetEpisodesQuery as jest.MockedFunction<typeof useGetEpisodesQuery>;

const character: CharacterDetailType = {
  id: '1',
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
};

const episodes: EpisodeType[] = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    created: '',
    url: '',
  },
];

describe('CharacterDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });

    mockUseGetEpisodesQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:characterId' element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays the character details correctly', async () => {
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      data: character,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    mockUseGetEpisodesQuery.mockReturnValue({
      data: episodes,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:characterId' element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
  });

  it('hides the component when the back button is clicked', async () => {
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      data: character,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    mockUseGetEpisodesQuery.mockReturnValue({
      data: episodes,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:characterId' element={<CharacterDetail />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Rick Sanchez');
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });
});
