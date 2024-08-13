import Image from 'next/image';
import errorImage from '../../../public/error.webp';
import styles from './FallbackContent.module.css';

const FallbackContent = () => {
  return (
    <div className={styles['fallback-content']}>
      <h2>Something went wrong. Please try again later.</h2>
      <Image src={errorImage} alt='Error' className={styles['fallback-content-image']} />
    </div>
  );
};

export default FallbackContent;
