import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { CharacterDetailType } from '@/store/types';

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

describe('CharacterCard', () => {
  it('renders character information', () => {
    render(<CharacterCard character={character} onSelect={() => {}} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Last Known Location:')).toBeInTheDocument();
    expect(screen.getByText('First Seen In:')).toBeInTheDocument();
  });
});
