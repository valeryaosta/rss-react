import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import FormDataDisplay from '../../components/formDataDisplay/FormDataDisplay';
import { clearLastAddedForm } from '../../store/slices/formSlice';
import './Main.css';

const Main = () => {
  const uncontrolledFormData = useAppSelector((state) => state.formData.uncontrolledForm);
  const hookFormData = useAppSelector((state) => state.formData.hookForm);
  const lastAddedForm = useAppSelector((state) => state.formData.lastAddedForm);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastAddedForm) {
      const timer = setTimeout(() => {
        dispatch(clearLastAddedForm());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedForm, dispatch]);

  return (
    <div>
      <h1>Main Page</h1>
      {uncontrolledFormData || hookFormData ? (
        <div className='forms-wrapper'>
          <FormDataDisplay
            title='Uncontrolled Form Data'
            formData={uncontrolledFormData}
            isNew={lastAddedForm === 'uncontrolled'}
          />
          <FormDataDisplay title='Hook Form Data' formData={hookFormData} isNew={lastAddedForm === 'hook'} />
        </div>
      ) : (
        <p>Fill out one of the forms to see the data here.</p>
      )}
    </div>
  );
};

export default Main;
