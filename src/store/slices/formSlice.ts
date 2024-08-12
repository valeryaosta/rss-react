import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormInputData {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  image: string;
  country: string;
}

export interface FormsStateData {
  uncontrolledForm: FormInputData | null;
  hookForm: FormInputData | null;
}

const initialState: FormsStateData = {
  uncontrolledForm: null,
  hookForm: null,
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveUncontrolledFormData(state, action: PayloadAction<FormInputData>) {
      state.uncontrolledForm = action.payload;
    },
    saveHookFormData(state, action: PayloadAction<FormInputData>) {
      state.hookForm = action.payload;
    },
  },
});

export const { saveUncontrolledFormData, saveHookFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
