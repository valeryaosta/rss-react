import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterDetailType } from '../types.ts';

type CharacterState = {
  currentPage: number;
  searchTerm: string;
  selectedCharacter: CharacterDetailType | null;
};

const initialState: CharacterState = {
  currentPage: 1,
  searchTerm: '',
  selectedCharacter: null,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedCharacter(state, action: PayloadAction<CharacterDetailType>) {
      state.selectedCharacter = action.payload;
    },
  },
});

export const { setCurrentPage, setSearchTerm, setSelectedCharacter } = characterSlice.actions;

export default characterSlice.reducer;
