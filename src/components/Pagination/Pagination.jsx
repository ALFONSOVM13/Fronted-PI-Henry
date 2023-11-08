// Pagination.js
import React from 'react';
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti';

const Pagination = ({ currentPage, paginate, totalItems, itemsPerPage }) => {
  const showPageNumbers = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= Math.ceil(totalItems / itemsPerPage)
  );

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <TiArrowLeftOutline />
      </button>
      {showPageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination__button ${currentPage === number ? 'active' : 'page-number'}`}
        >
          {number}
        </button>
      ))}
      <button
        className="pagination__button"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
      >
        <TiArrowRightOutline />
      </button>
    </div>
  );
};

export default Pagination;
