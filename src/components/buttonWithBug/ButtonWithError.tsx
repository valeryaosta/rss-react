import { useState } from 'react';
import styles from './ButtonWithError.module.css';

const ButtonWithError = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  if (clicked) {
    throw new Error('Imitate application error...');
  }

  return (
    <button onClick={handleClick} className={styles['btn-error']}>
      Click to receive Error
    </button>
  );
};

export default ButtonWithError;
