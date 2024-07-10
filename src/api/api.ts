const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page: number = 1, name: string = '') => {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}&name=${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};
