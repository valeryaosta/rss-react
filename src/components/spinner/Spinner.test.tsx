import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders the spinner component', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('applies correct styles to the spinner', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('spinner-container');
  });
});
