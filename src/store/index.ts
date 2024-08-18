import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './slices/formSlice';
import countryReducer from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
