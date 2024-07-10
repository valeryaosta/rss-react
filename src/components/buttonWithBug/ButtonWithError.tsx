import { useState } from 'react';
import './ButtonWithError.css';

const ButtonWithError = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  if (clicked) {
    throw new Error('Imitate application error...');
  }

  return (
    <button onClick={handleClick} className='btn-error'>
      Click to receive Error
    </button>
  );
};

export default ButtonWithError;
