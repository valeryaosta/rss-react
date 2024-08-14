import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../../data/countries';

export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
