import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CharacterDetail from './CharacterDetail';
import * as api from '../../api/api';
import '@testing-library/jest-dom';

jest.mock('../../api/api');

const mockGetCharacterDetails = api.getCharacterDetails as jest.MockedFunction<typeof api.getCharacterDetails>;
const mockGetEpisodes = api.getEpisodes as jest.MockedFunction<typeof api.getEpisodes>;

const character = {
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

const episodes = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
  },
];

describe('CharacterDetail', () => {
  beforeEach(() => {
    mockGetCharacterDetails.mockClear();
    mockGetEpisodes.mockClear();
  });

  it('displays a loading indicator while fetching data', async () => {
    mockGetCharacterDetails.mockReturnValue(new Promise(() => {}));

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
    mockGetCharacterDetails.mockResolvedValueOnce(character);
    mockGetEpisodes.mockResolvedValueOnce(episodes);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:characterId' element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element?.textContent === 'Status: Alive')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element?.textContent === 'Species: Human')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element?.textContent === 'Gender: Male')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => element?.textContent === 'Origin: Earth (C-137)'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === 'Last known location: Earth (Replacement Dimension)',
      ),
    ).toBeInTheDocument();
  });

  it('hides the component when the close button is clicked', async () => {
    mockGetCharacterDetails.mockResolvedValueOnce(character);
    mockGetEpisodes.mockResolvedValueOnce(episodes);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path='/character/:characterId' element={<CharacterDetail />} />
          <Route path='/' element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Rick Sanchez');
    const backButton = screen.getByText('Back');
    userEvent.click(backButton);

    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });
});
