import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterDetailType } from '../types.ts';

type CharacterState = {
  currentPage: number;
  searchTerm: string;
  selectedCharacter: CharacterDetailType | null;
  selectedItems: CharacterDetailType[];
};

const initialState: CharacterState = {
  currentPage: 1,
  searchTerm: '',
  selectedCharacter: null,
  selectedItems: [],
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
    addItem(state, action: PayloadAction<CharacterDetailType>) {
      state.selectedItems.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload);
    },
    unselectAll(state) {
      state.selectedItems = [];
    },
  },
});

export const { setCurrentPage, setSearchTerm, setSelectedCharacter, addItem, removeItem, unselectAll } =
  characterSlice.actions;

export default characterSlice.reducer;
