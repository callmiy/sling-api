// @flow
import React from 'react';

const Pagination = (props: Object) => {
  const {
    page_number,
    total_pages,
    loadRooms,
    pageSize,
    numRooms,
  } = props;

  const totalPages = numRooms > pageSize ?
    total_pages + Math.floor(numRooms / pageSize) : total_pages;

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="btn-group" >
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={page_number < 2}
          onClick={() => loadRooms(null, page_number - 1)}
        >
          {'<'}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={page_number === totalPages}
          onClick={() => loadRooms(null, page_number + 1)}
        >
          {'>'}
        </button>
      </div>
      <div> Page {page_number} of {totalPages} </div>
    </div>
  );
};

export default Pagination;
