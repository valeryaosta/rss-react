import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it('renders the current page and total pages', () => {
    render(<Pagination currentPage={3} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    expect(screen.getByText('3 of 10 pages')).toBeInTheDocument();
  });

  it('renders the correct number of page buttons', () => {
    render(<Pagination currentPage={5} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    expect(screen.getAllByRole('button').length).toBe(12);
  });

  it('calls setCurrentPage with the next page number when ">" button is clicked', () => {
    render(<Pagination currentPage={3} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    fireEvent.click(screen.getByText('>'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
  });

  it('calls setCurrentPage with the previous page number when "<" button is clicked', () => {
    render(<Pagination currentPage={3} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    fireEvent.click(screen.getByText('<'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it('disables the "<" button on the first page', () => {
    render(<Pagination currentPage={1} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    expect(screen.getByText('<')).toBeDisabled();
  });

  it('disables the ">" button on the last page', () => {
    render(<Pagination currentPage={10} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    expect(screen.getByText('>')).toBeDisabled();
  });

  it('calls setCurrentPage with the correct page number when a page button is clicked', () => {
    render(<Pagination currentPage={5} setCurrentPage={mockSetCurrentPage} totalPages={10} />);
    fireEvent.click(screen.getByText('7'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(7);
  });
});
