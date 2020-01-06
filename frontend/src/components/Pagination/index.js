import React from 'react';
import PropTypes from 'prop-types';
import { Pages, Button } from './styles';

const Pagination = ({
  pageSize,
  recordCount,
  paginate,
  currentPage,
  pageNeighbours,
}) => {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(recordCount / pageSize); i++) {
    pageNumbers.push(i);
  }

  const totalPages = pageNumbers.length;

  let avoidLeft = currentPage - pageNeighbours;
  let avoidRight = currentPage + pageNeighbours;

  const overRight = avoidRight - totalPages;
  const overleft = avoidLeft - 1;

  if (overRight > 0) {
    avoidLeft -= overRight;
  }

  if (overleft < 0) {
    avoidRight += overleft * -1;
  }

  return (
    <Pages>
      {pageNumbers.map(number => {
        if (number >= avoidLeft && number <= avoidRight) {
          return (
            <li key={number} className="page-item">
              <Button
                color={number === currentPage ? 'primary' : 'secondary'}
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            </li>
          );
        }
        return null;
      })}
    </Pages>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
};

export default Pagination;
