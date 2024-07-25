import characterReducer, {
  setCurrentPage,
  setSearchTerm,
  setSelectedCharacter,
  addItem,
  removeItem,
  unselectAll,
} from './characterSlice';
import { CharacterDetailType } from '../types';

describe('characterSlice', () => {
  const initialState = {
    currentPage: 1,
    searchTerm: '',
    selectedCharacter: null,
    selectedItems: [] as CharacterDetailType[],
  };

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

  it('should handle initial state', () => {
    expect(characterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentPage', () => {
    const actual = characterReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it('should handle setSearchTerm', () => {
    const actual = characterReducer(initialState, setSearchTerm('Morty'));
    expect(actual.searchTerm).toEqual('Morty');
  });

  it('should handle setSelectedCharacter', () => {
    const actual = characterReducer(initialState, setSelectedCharacter(character));
    expect(actual.selectedCharacter).toEqual(character);
  });

  it('should handle addItem', () => {
    const actual = characterReducer(initialState, addItem(character));
    expect(actual.selectedItems).toEqual([character]);
  });

  it('should handle removeItem', () => {
    const stateWithItem = {
      ...initialState,
      selectedItems: [character],
    };
    const actual = characterReducer(stateWithItem, removeItem('1'));
    expect(actual.selectedItems).toEqual([]);
  });

  it('should handle unselectAll', () => {
    const stateWithItems = {
      ...initialState,
      selectedItems: [character, { ...character, id: '2' }],
    };
    const actual = characterReducer(stateWithItems, unselectAll());
    expect(actual.selectedItems).toEqual([]);
  });
});
