'use client';

import FallbackContent from '../components/fallbackContent/FallbackContent.tsx';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

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
