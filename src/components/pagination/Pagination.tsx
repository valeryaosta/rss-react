import './Pagination.css';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const maxPagesToShow = 10;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className='pagination'>
      <div className='pagintauin-button-wrapper'>
        <button
          className='pagination-button'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          className='pagination-button'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <span className='pagination-info'>
        {currentPage} of {totalPages} pages
      </span>
    </div>
  );
};

export default Pagination;
