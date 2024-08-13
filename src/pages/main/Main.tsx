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
            <div className='form-wrapper'>
              <p>
                <strong>Name:</strong> {uncontrolledFormData.name}
              </p>
              <p>
                <strong>Age:</strong> {uncontrolledFormData.age}
              </p>
              <p>
                <strong>Email:</strong> {uncontrolledFormData.email}
              </p>
              <p>
                <strong>Gender:</strong> {uncontrolledFormData.gender}
              </p>
              <p>
                <strong>Country:</strong> {uncontrolledFormData.country}
              </p>
              <p>
                <strong>Accepted Terms:</strong> {uncontrolledFormData.terms ? 'Yes' : 'No'}
              </p>
              {uncontrolledFormData.picture && (
                <div className='form-picture'>
                  <h4>Uploaded Picture:</h4>
                  <img src={uncontrolledFormData.picture} alt='Uploaded' />
                </div>
              )}
            </div>
          ) : (
            <p>No data from Uncontrolled Form</p>
          )}
          <h2>Hook Form Data:</h2>
          {hookFormData ? (
            <div>
              <p>
                <strong>Name:</strong> {hookFormData.name}
              </p>
              <p>
                <strong>Age:</strong> {hookFormData.age}
              </p>
              <p>
                <strong>Email:</strong> {hookFormData.email}
              </p>
              <p>
                <strong>Gender:</strong> {hookFormData.gender}
              </p>
              <p>
                <strong>Country:</strong> {hookFormData.country}
              </p>
              <p>
                <strong>Accepted Terms:</strong> {hookFormData.terms ? 'Yes' : 'No'}
              </p>
              {hookFormData.picture && (
                <div className='form-picture'>
                  <h4>Uploaded Picture:</h4>
                  <img src={hookFormData.picture} alt='Uploaded' />
                </div>
              )}
            </div>
          ) : (
            <p>No data from Hook Form</p>
          )}
        </div>
      ) : (
        <p>Fill out one of the forms to see the data here.</p>
      )}
    </div>
  );
};

export default Main;
