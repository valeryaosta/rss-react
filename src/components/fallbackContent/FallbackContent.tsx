import './FallbackContent.css';
import errorImage from '../../assets/error.webp';

const FallbackContent = () => {
  return (
    <div className='fallback-content'>
      <h1>Something went wrong. Please try again later.</h1>
      <img src={errorImage} alt='Error' />
    </div>
  );
};

export default FallbackContent;
