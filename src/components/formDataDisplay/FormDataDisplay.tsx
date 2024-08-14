interface FormDataProps {
  title: string;
  formData: {
    name: string;
    age: number;
    email: string;
    gender: string;
    country: string;
    terms: boolean;
    picture: string;
  } | null;
}

const FormDataDisplay = ({ title, formData }: FormDataProps) => {
  if (!formData) {
    return (
      <div className='form-wrapper'>
        <h2>{title}:</h2>
        <p>No data from {title}</p>
      </div>
    );
  }

  return (
    <div className='form-wrapper'>
      <h2>{title}:</h2>
      <p>
        <strong>Name:</strong> {formData.name}
      </p>
      <p>
        <strong>Age:</strong> {formData.age}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Gender:</strong> {formData.gender}
      </p>
      <p>
        <strong>Country:</strong> {formData.country}
      </p>
      <p>
        <strong>Accepted Terms:</strong> {formData.terms ? 'Yes' : 'No'}
      </p>
      {formData.picture && (
        <div className='form-picture'>
          <h4>Uploaded Picture:</h4>
          <img src={formData.picture} alt='Uploaded' />
        </div>
      )}
    </div>
  );
};

export default FormDataDisplay;
