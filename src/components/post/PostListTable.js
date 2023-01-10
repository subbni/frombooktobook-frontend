import { useEffect, useRef, useState } from 'react';
import { Navigate } from '../../../node_modules/react-router-dom/index';
import PostService from '../../service/PostService';
import style from './css/PostList.module.css';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { PostPaging } from './PostPaging';
import { checkIfAuthenticated } from '../../service/AuthService';

const PostListTable = () => {
  const [postList, setPostList] = useState([]);
  const [pageForm, setPageForm] = useState({
    page: 0,
    size: 10,
    sort: 'id,DESC',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    PostService.getPostList(pageForm).then((response) => {
      setPostList(response.content);
      setTotalElements(response.totalElements);
      console.log(response.content);
    });
  }, [pageForm]);

  const onPostClick = (e) => {
    if (checkIfAuthenticated()) {
      navigate(`/post/${e.target.id}`);
    } else {
      navigate('/post');
    }
  };

  const onPageClick = (e) => {
    setCurrentPage(() => e);
    setPageForm({
      ...pageForm,
      page: e - 1,
    });
  };

  return (
    <>
      <table className={style.table}>
        <thead className={style.tableHead}>
          <tr className={style.tableTopRow}>
            <th className={style.th}>글번호</th>
            <th className={style.th}>책 제목</th>
            <th className={style.th}>저자</th>
            <th className={style.th}>독후감 제목</th>
            <th className={style.th}>작성일자</th>
            <th className={style.th}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => (
            <tr key={post.id} className={style.tableRow} onClick={onPostClick}>
              <td id={post.id} className={style.td}>
                {post.id}
              </td>
              <td id={post.id} className={style.td}>
                {post.book.title}
              </td>
              <td id={post.id} className={style.td}>
                {post.book.author}
              </td>
              <td id={post.id} className={style.td}>
                {post.title}
              </td>
              <td id={post.id} className={style.td}>
                {post.createdDate.substring(0, 10)}
              </td>
              <td id={post.id} className={style.td}>
                {post.views}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PostPaging
        currentPage={currentPage}
        totalCount={totalElements}
        onPageChange={onPageClick}
      />
    </>
  );
};

export default PostListTable;
