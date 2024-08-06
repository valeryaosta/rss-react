import FallbackContent from '../components/fallbackContent/FallbackContent';
import { useRouter } from 'next/router';
import styles from './404.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div className={styles['not-found']}>
      <h1>404: Page Not Found</h1>
      <FallbackContent />
      <button onClick={handleRedirect}>to Main page</button>
    </div>
  );
};

export default NotFoundPage;
