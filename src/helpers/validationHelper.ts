import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .matches(/\d/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  picture: Yup.mixed<File>()
    .nullable()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value) {
        console.log('File type:', value.type);
        return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File Size is too large', (value) => {
      if (value) {
        console.log('File size in bytes:', value.size);
        console.log('File size in MB:', value.size / 1024 / 1024);
        const fileSizeInMB = value.size / 1024 / 1024;
        return fileSizeInMB <= 1;
      }
      return true;
    }),
  country: Yup.string().required('Country is required'),
});

export const validationSchema2 = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .matches(/\d/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().required('Gender is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').default(false),
  picture: Yup.mixed<File>()
    .nullable()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value && value instanceof File) {
        return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File Size is too large', (value) => {
      if (value && value instanceof File) {
        const fileSizeInMB = value.size / 1024 / 1024;
        return fileSizeInMB <= 1;
      }
      return true;
    }),
  country: Yup.string().required('Country is required'),
});
