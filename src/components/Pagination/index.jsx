import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd'

import './index.css'

Pagination.propTypes = {
  pagination: PropTypes.objectOf.isRequired,
    onPageChange: PropTypes.func
};
Pagination.defaultProps = {
    onPageChange : null
}

function PaginationBSC(props) {
    const {pagination, onPageChange } = props
    const { pageNumber, pageSize, totalCount } = pagination;

  function handlePageChange(_newPage, _pageSize) {
        if(onPageChange){
            onPageChange(_newPage,_pageSize);
        }
    }

    return (
      <Pagination
        className='bsc-pagination'
        onChange={handlePageChange}
        defaultCurrent={1}
        current={pageNumber}
        total={totalCount}
        pageSize={pageSize}
      />
    );
}

export default PaginationBSC;