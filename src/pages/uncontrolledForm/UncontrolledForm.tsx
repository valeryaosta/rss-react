import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks.ts';
import UncontrolledFormAutocomplete from '../../components/uncontrolledFormAutocomplete/UncontrolledFormAutocomplete';
import { saveUncontrolledFormData } from '../../store/slices/formSlice.ts';
import { validationSchema } from '../../helpers/validationHelper.ts';
import * as Yup from 'yup';
import './UncontrolledForm.css';

const UncontrolledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pictureFile = pictureRef.current?.files?.[0] || null;

    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureFile,
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      let base64Image = '';
      if (pictureFile) {
        const reader = new FileReader();
        reader.readAsDataURL(pictureFile);
        base64Image = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      }

      dispatch(saveUncontrolledFormData({ ...formData, picture: base64Image }));

      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Some unexpected error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Uncontrolled Form Page</h1>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' ref={emailRef} placeholder='Enter email address' />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' ref={passwordRef} placeholder='Enter password' />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input id='confirmPassword' type='password' ref={confirmPasswordRef} placeholder='Confirm password' />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' ref={nameRef} placeholder='Enter your name' />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input id='age' type='text' ref={ageRef} placeholder='Enter your age' />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label htmlFor='country'>Country</label>
        <UncontrolledFormAutocomplete inputRef={countryRef} />
        {errors.country && <p>{errors.country}</p>}
      </div>
      <div className='form-gender'>
        <label htmlFor='gender'>Gender</label>
        <select id='gender' ref={genderRef}>
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}
      </div>
      <div className='input-upload'>
        <label htmlFor='picture'>Upload Picture</label>
        <input id='picture' type='file' ref={pictureRef} accept='image/jpeg,image/png,image/gif' />
        {errors.picture && <p>{errors.picture}</p>}
      </div>
      <div>
        <div className='input-terms'>
          <input id='terms' type='checkbox' ref={termsRef} />
          <label htmlFor='terms'>Accept Terms and Conditions</label>
        </div>
        {errors.terms && <p>{errors.terms}</p>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default UncontrolledForm;
