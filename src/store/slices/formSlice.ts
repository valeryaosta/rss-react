import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormInputData {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  picture: string;
  country: string;
}

export interface FormsStateData {
  uncontrolledForm: FormInputData | null;
  hookForm: FormInputData | null;
  lastAddedForm: 'uncontrolled' | 'hook' | null;
}

const initialState: FormsStateData = {
  uncontrolledForm: null,
  hookForm: null,
  lastAddedForm: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveUncontrolledFormData(state, action: PayloadAction<FormInputData>) {
      state.uncontrolledForm = action.payload;
      state.lastAddedForm = 'uncontrolled';
    },
    saveHookFormData(state, action: PayloadAction<FormInputData>) {
      state.hookForm = action.payload;
      state.lastAddedForm = 'hook';
    },
    clearLastAddedForm(state) {
      state.lastAddedForm = null;
    },
  },
});

export const { saveUncontrolledFormData, saveHookFormData, clearLastAddedForm } = formDataSlice.actions;
export default formDataSlice.reducer;
