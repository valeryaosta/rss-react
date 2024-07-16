import { getCharacters, getCharacterDetails, getEpisodes } from './api';

describe('API Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches characters', async () => {
    const mockCharacters = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    const data = await getCharacters(1, 'rick');

    expect(data).toEqual(mockCharacters);
    expect(global.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=1&name=rick');
  });

  it('fetches character details', async () => {
    const mockCharacterDetails = {
      id: 1,
      name: 'Rick Sanchez',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacterDetails,
    });

    const data = await getCharacterDetails('1');

    expect(data).toEqual(mockCharacterDetails);
    expect(global.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
  });

  it('fetches episodes', async () => {
    const mockEpisodes = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEpisodes,
    });

    const data = await getEpisodes(['https://rickandmortyapi.com/api/episode/1']);

    expect(data).toEqual(mockEpisodes);
    expect(global.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1');
  });

  it('throws an error if fetch characters fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCharacters(1, 'rick')).rejects.toThrow('Failed to fetch characters');
  });

  it('throws an error if fetch character details fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCharacterDetails('1')).rejects.toThrow('Failed to fetch character details');
  });

  it('throws an error if fetch episodes fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getEpisodes(['https://rickandmortyapi.com/api/episode/1'])).rejects.toThrow(
      'Failed to fetch episodes',
    );
  });
});
