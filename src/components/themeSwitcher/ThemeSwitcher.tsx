import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import Light from '../../../public/ligth-mode.png';
import Dark from '../../../public/dark-mode.png';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className='theme-toggle-btn'>
      Theme
      {theme === 'light' ? (
        <Image src={Light} alt='Light mode' className={'theme-toggle-image'} />
      ) : (
        <Image src={Dark} alt='Dark mode' className={'theme-toggle-image'} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
