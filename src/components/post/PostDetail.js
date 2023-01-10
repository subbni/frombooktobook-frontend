import { useEffect, useState } from 'react';
import PostService from '../../service/PostService';
import HeartButton from '../public/HeartButton';
import style from './css/PostDetail.module.css';
import './css/PostDetail.css';
import { useNavigate } from 'react-router-dom';
import PostUpdatePage from '../../routes/post/PostUpdatePage';

const PostDetail = (id) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    postId: '',
    writerName: '',
    bookName: '',
    bookAuthor: '',
    title: '',
    content: '',
    rate: -1,
    likedCount: '',
  });
  const [isLiked, setIsLiked] = useState(false);
  const [likedForm, setLikedForm] = useState({
    email: '',
    postId: '',
  });
  const [isWriter, setIsWriter] = useState(false);

  useEffect(() => {
    setLikedForm({
      email: localStorage.getItem('userEmail'),
      postId: id,
    });
    // 좋아요 여부 확인 및 설정
    PostService.getPostDetail(id).then((response) => {
      console.log(response);
      setPost({
        postId: response.id,
        writerName: response.writerName,
        bookName: response.book.title,
        bookAuthor: response.book.author,
        title: response.title,
        content: response.content,
        rate: response.book.rate,
        likedCount: response.likedCount,
        views: response.views,
      });
      console.log(response);
      setIsWriter(response.writer);
    });

    isLikedPushed();
  }, []);

  const isLikedPushed = () => {
    PostService.checkIfLikedPushed(id).then((response) => {
      setIsLiked(response.liked);
      console.log(response.liked);
    });
  };

  // 좋아요 누르기
  const onHeartClicked = () => {
    PostService.pushedLikedButton(id).then((response) => {
      setIsLiked((current) => response.liked);
      if (isLiked) {
        const subedCount = post.likedCount - 1;
        setPost({
          ...post,
          likedCount: subedCount,
        });
      } else {
        const addedCount = post.likedCount + 1;
        setPost({
          ...post,
          likedCount: addedCount,
        });
      }
    });
  };

  const onDeleteClicked = () => {
    if (window.confirm('이 독후감을 삭제하시겠습니까?')) {
      PostService.deletePost(id).then((response) => {
        console.log(response);
        if (response.success) {
          window.alert('삭제가 완료되었습니다.');
          navigate('/post');
        } else {
          window.alert('삭제에 실패하였습니다.');
        }
      });
    }
  };

  const onUpdateClicked = () => {
    navigate('/post/update', {
      state: {
        postId: post.postId,
        bookName: post.bookName,
        bookAuthor: post.bookAuthor,
        title: post.title,
        content: post.content,
        rate: post.rate,
      },
    });
  };

  return (
    <div className="detailBox">
      <div>
        <div className="title">{post.title}</div>
        <div className="written">written by {post.writerName}</div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>책 제목</th>
            <td>{post.bookName}</td>
          </tr>
          <tr>
            <th>책 저자</th>
            <td>{post.bookAuthor}</td>
          </tr>
          <tr>
            <th>평점</th>
            <td>{post.rate}</td>
          </tr>
        </tbody>
      </table>
      <div className="content">{post.content}</div>
      {isWriter ? (
        <div style={{ display: 'flex' }}>
          <button className="styledButton" onClick={onDeleteClicked}>
            삭제
          </button>
          <button className="styledButton" onClick={onUpdateClicked}>
            수정
          </button>
        </div>
      ) : null}
      <div className="heartButton">
        <HeartButton clicked={isLiked} onClick={onHeartClicked} />
        <div>{post.likedCount}</div>
      </div>
    </div>
  );
};
export default PostDetail;
