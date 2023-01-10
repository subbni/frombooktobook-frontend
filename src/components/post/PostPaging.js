import Pagination from 'react-js-pagination';
import style from './css/PostPaging.css';

export const PostPaging = ({ currentPage, totalCount, onPageChange }) => {
  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={10}
      totalItemsCount={totalCount}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={onPageChange}
    />
  );
};
