import './FallbackContent.css';
import errorImage from '../../assets/error.webp';

const FallbackContent = () => {
  return (
    <div className='fallback-content'>
      <h2>Something went wrong. Please try again later.</h2>
      <img src={errorImage} alt='Error' />
    </div>
  );
};

export default FallbackContent;
