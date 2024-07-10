import FallbackContent from '../../components/fallbackContent/FallbackContent.tsx';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className='not-found'>
      <h1>404: Page Not Found</h1>
      <FallbackContent />
    </div>
  );
};

export default NotFoundPage;
