import { useAppSelector } from '../../hooks/reduxHooks.ts';
import FormDataDisplay from '../../components/formDataDisplay/FormDataDisplay';
import './Main.css';

const Main = () => {
  const uncontrolledFormData = useAppSelector((state) => state.formData.uncontrolledForm);
  const hookFormData = useAppSelector((state) => state.formData.hookForm);

  return (
    <div>
      <h1>Main Page</h1>
      {uncontrolledFormData || hookFormData ? (
        <div className='forms-wrapper'>
          <FormDataDisplay title='Uncontrolled Form Data' formData={uncontrolledFormData} />
          <FormDataDisplay title='Hook Form Data' formData={hookFormData} />
        </div>
      ) : (
        <p>Fill out one of the forms to see the data here.</p>
      )}
    </div>
  );
};

export default Main;
