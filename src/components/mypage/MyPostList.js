import { useEffect, useState } from 'react';
import style from './MyPage.module.css';
import PostService from '../../service/PostService';
import { useNavigate } from 'react-router-dom';
const MyPostList = () => {
  const [userName, setUserName] = useState('');
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    PostService.getUserPostList().then((response) => {
      setPostList(response.content);
      console.log(response);
    });
    setUserName(localStorage.getItem('userName'));
  }, []);

  const onClick = (e) => {
    navigate(`/post/${e.target.id}`);
  };

  return (
    <div className={style.box}>
      <div className={style.title}>나의 독후감</div>
      <table className={style.table}>
        <thead className={style.tableHead}>
          <tr className={style.tableTopRow}>
            <th className={style.th}>글번호</th>
            <th className={style.th}>책 제목</th>
            <th className={style.th}>저자</th>
            <th className={style.th}>독후감 제목</th>
            <th className={style.th}>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => (
            <tr key={post.id} className={style.tableRow} onClick={onClick}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPostList;
