import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from './Flyout';
import characterReducer from '../../store/slices/characterSlice';
import { CharacterDetailType } from '../../store/types';
import { RootState } from '../../store/store';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const renderWithStore = (store: ReturnType<typeof configureStore>) => {
  return render(
    <Provider store={store}>
      <Flyout />
    </Provider>,
  );
};

const mockCharacter: CharacterDetailType = {
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

describe('Flyout', () => {
  it('displays when there are selected items', () => {
    const store = configureStore({
      reducer: {
        characters: characterReducer,
      },
      preloadedState: {
        characters: {
          selectedItems: [mockCharacter],
          currentPage: 1,
          searchTerm: '',
          selectedCharacter: null,
        } as RootState['characters'],
      },
    });

    renderWithStore(store);

    expect(screen.getByText('1 item(s) selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('does not display when there are no selected items', () => {
    const store = configureStore({
      reducer: {
        characters: characterReducer,
      },
      preloadedState: {
        characters: {
          selectedItems: [],
          currentPage: 1,
          searchTerm: '',
          selectedCharacter: null,
        } as RootState['characters'],
      },
    });

    renderWithStore(store);

    expect(screen.queryByText('item(s) selected')).toBeNull();
    expect(screen.queryByText('Unselect all')).toBeNull();
    expect(screen.queryByText('Download')).toBeNull();
  });

  it('unselects all items when "Unselect all" is clicked', () => {
    const store = configureStore({
      reducer: {
        characters: characterReducer,
      },
      preloadedState: {
        characters: {
          selectedItems: [mockCharacter],
          currentPage: 1,
          searchTerm: '',
          selectedCharacter: null,
        } as RootState['characters'],
      },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByText('Unselect all'));

    expect(store.getState().characters.selectedItems).toEqual([]);
  });

  it('downloads a CSV file when "Download" is clicked', () => {
    const store = configureStore({
      reducer: {
        characters: characterReducer,
      },
      preloadedState: {
        characters: {
          selectedItems: [mockCharacter],
          currentPage: 1,
          searchTerm: '',
          selectedCharacter: null,
        } as RootState['characters'],
      },
    });

    renderWithStore(store);

    fireEvent.click(screen.getByText('Download'));

    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), '1_characters.csv');
  });
});
