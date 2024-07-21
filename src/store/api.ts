import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ page = 1, name = '' }) => `character?page=${page}&name=${name}`,
    }),
    getCharacterDetails: builder.query({
      query: (id) => `character/${id}`,
    }),
    getEpisodes: builder.query({
      query: (episodes: string[]) => {
        const episodeIds = episodes.map((ep: string) => ep.split('/').pop()).join(',');
        return `episode/${episodeIds}`;
      },
      transformResponse: (response) => {
        return Array.isArray(response) ? response : [response];
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery, useGetEpisodesQuery } = api;
