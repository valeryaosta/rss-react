import { useAppSelector } from '../../hooks/reduxHooks.ts';
import { RootState } from '../../store';
import './Main.css';

const Main = () => {
  const uncontrolledFormData = useAppSelector((state: RootState) => state.formData.uncontrolledForm);
  const hookFormData = useAppSelector((state: RootState) => state.formData.hookForm);

  return (
    <div>
      <h1>Main Page</h1>
      {uncontrolledFormData || hookFormData ? (
        <div>
          <h2>Uncontrolled Form Data:</h2>
          {uncontrolledFormData ? (
            <pre>{JSON.stringify(uncontrolledFormData, null, 2)}</pre>
          ) : (
            <p>No data from Uncontrolled Form</p>
          )}
          <h2>Hook Form Data:</h2>
          {hookFormData ? <pre>{JSON.stringify(hookFormData, null, 2)}</pre> : <p>No data from Hook Form</p>}
        </div>
      ) : (
        <p>Fill out one of the form to see the data here.</p>
      )}
    </div>
  );
};

export default Main;
