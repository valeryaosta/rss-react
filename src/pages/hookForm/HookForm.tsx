import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks.ts';
import { saveHookFormData } from '../../store/slices/formSlice.ts';
import { validationSchemaHookForm } from '../../helpers/validationHelper.ts';
import '../uncontrolledForm/UncontrolledForm.css';

interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture?: FileList | null;
  country: string;
}

const HookForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'France'];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaHookForm),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const terms = data.terms !== undefined ? data.terms : false;

    let base64Image = '';

    const pictureFile = data.picture instanceof File ? data.picture : data.picture?.[0];

    if (pictureFile) {
      const reader = new FileReader();
      reader.readAsDataURL(pictureFile);
      base64Image = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });
    }

    dispatch(saveHookFormData({ ...data, terms, picture: base64Image }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Hook Form Page</h1>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input id='confirmPassword' type='password' {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input id='age' type='text' {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor='country'>Country</label>
        <input id='country' type='text' {...register('country')} list='countryList' />
        <datalist id='countryList'>
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div>
        <label htmlFor='gender'>Gender</label>
        <select id='gender' {...register('gender')}>
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div className='input-upload'>
        <label htmlFor='picture'>Upload Picture</label>
        <input id='picture' type='file' {...register('picture')} accept='image/jpg,image/jpeg,image/png' />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>
      <div>
        <div className='input-terms'>
          <input id='terms' type='checkbox' {...register('terms')} />
          <label htmlFor='terms'>Accept Terms and Conditions</label>
        </div>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>
      <button type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
