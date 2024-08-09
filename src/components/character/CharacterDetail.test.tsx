import { render, screen } from '@testing-library/react';
import CharacterDetail from './CharacterDetail';
import { CharacterDetailType, EpisodeType } from '@/store/types';

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
    url: '',
    created: '',
  },
];

describe('CharacterDetail', () => {
  it('renders character detail information', () => {
    render(<CharacterDetail character={character} episodes={episodes} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('displays "No episodes found." when episodes list is empty', () => {
    render(<CharacterDetail character={character} episodes={[]} />);

    expect(screen.getByText('No episodes found.')).toBeInTheDocument();
  });
});
