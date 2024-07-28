import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CharacterList from './CharacterList';
import characterReducer from '../../store/slices/characterSlice';
import { useGetCharactersQuery } from '../../store/api';
import { CharacterDetailType } from '../../store/types';
import { addItem } from '../../store/slices/characterSlice';

jest.mock('../../store/api');

const mockUseGetCharactersQuery = useGetCharactersQuery as jest.MockedFunction<typeof useGetCharactersQuery>;

const characters: CharacterDetailType[] = [
  {
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
  },
];

const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

describe('CharacterList', () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of characters', async () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: { results: characters, info: { pages: 1 } },
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList setCurrentPage={mockSetCurrentPage} />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('displays loading spinner while fetching data', () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: jest.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList setCurrentPage={mockSetCurrentPage} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message when fetching data fails', async () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch characters'),
      isLoading: false,
      refetch: jest.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList setCurrentPage={mockSetCurrentPage} />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Failed to fetch characters/)).toBeInTheDocument();
  });

  it('displays selected character with checked checkbox', async () => {
    store.dispatch(addItem(characters[0]));

    mockUseGetCharactersQuery.mockReturnValue({
      data: { results: characters, info: { pages: 1 } },
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList setCurrentPage={mockSetCurrentPage} />
        </MemoryRouter>
      </Provider>,
    );

    const checkbox = await screen.findByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
