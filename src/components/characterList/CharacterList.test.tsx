import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import characterReducer, { addItem, removeItem } from '@/store/slices/characterSlice';
import { CharacterDetailType } from '@/store/types';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === 'page') {
        return '1';
      }
      if (key === 'search') {
        return 'Rick';
      }
      return null;
    }),
  }),
}));

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
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of characters', () => {
    render(
      <Provider store={store}>
        <CharacterList
          characters={characters}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      </Provider>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('displays "No characters found" when character list is empty', () => {
    render(
      <Provider store={store}>
        <CharacterList
          characters={[]}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      </Provider>,
    );

    expect(screen.getByText('No characters found')).toBeInTheDocument();
  });

  it('displays a spinner when loading is true', () => {
    render(
      <Provider store={store}>
        <CharacterList
          characters={[]}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={true}
        />
      </Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('calls addItem when a character checkbox is checked', () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <CharacterList
          characters={characters}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(addItem(characters[0]));
  });

  it('calls removeItem when a character checkbox is unchecked', () => {
    store.dispatch(addItem(characters[0]));

    const mockDispatch = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <CharacterList
          characters={characters}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(removeItem(characters[0].id));
  });

  it('calls onPageChange when the page is changed', () => {
    render(
      <Provider store={store}>
        <CharacterList
          characters={characters}
          currentPage={1}
          totalPages={2}
          onPageChange={mockOnPageChange}
          isLoading={false}
        />
      </Provider>,
    );

    fireEvent.click(screen.getByText('2'));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
