const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page: number = 1, name: string = '') => {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}&name=${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const getCharacterDetails = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character details');
  }
  return response.json();
};

export const getEpisodes = async (episodes: string[]) => {
  const episodeIds = episodes.map((ep) => ep.split('/').pop()).join(',');
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episodes');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};
