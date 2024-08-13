import { render, screen, fireEvent } from '@testing-library/react';
import ButtonWithError from './ButtonWithError';

describe('ButtonWithError', () => {
  it('renders button correctly', () => {
    render(<ButtonWithError />);
    const buttonElement = screen.getByText('Click to receive Error');
    expect(buttonElement).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ButtonWithError />);
      const buttonElement = screen.getByText('Click to receive Error');
      fireEvent.click(buttonElement);
    }).toThrow('Imitate application error...');

    spy.mockRestore();
  });
});
