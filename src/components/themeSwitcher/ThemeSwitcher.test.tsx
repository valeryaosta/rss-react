import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';

jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('ThemeSwitcher', () => {
  it('renders with light theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByAltText('Light mode')).toBeInTheDocument();
    expect(screen.queryByAltText('Dark mode')).not.toBeInTheDocument();
  });

  it('renders with dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByAltText('Dark mode')).toBeInTheDocument();
    expect(screen.queryByAltText('Light mode')).not.toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    const toggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole('button', { name: /theme/i });
    fireEvent.click(button);

    expect(toggleTheme).toHaveBeenCalled();
  });
});
