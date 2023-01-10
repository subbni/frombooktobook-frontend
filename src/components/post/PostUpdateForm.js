import { useEffect, useState } from 'react';
import style from './css/Post.module.css';
import Axios from 'axios';
import PostService from '../../service/PostService';
import { useLocation } from '../../../node_modules/react-router-dom/index';
import { useNavigate } from 'react-router-dom';

const PostUpdateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [requestForm, setRequestForm] = useState({
    userEmail: '',
    title: '',
    content: '',
    bookTitle: '',
    bookAuthor: '',
    bookRate: -1,
  });

  useEffect(() => {
    setRequestForm({
      postId: location.state.postId,
      title: location.state.title,
      content: location.state.content,
      bookTitle: location.state.bookName,
      bookAuthor: location.state.bookAuthor,
      bookRate: location.state.rate,
    });
  }, []);

  const onChange = (e) => {
    const changingField = e.target.name;
    setRequestForm({
      ...requestForm,
      [changingField]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(requestForm);
    PostService.updatePost(requestForm).then(() => {
      alert('수정 완료!');
      navigate(-1);
    });
  };

  return (
    <div className={style.formBlock}>
      <h3>독후감 수정</h3>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.bookInfo}>
          <input
            className={style.styledInput}
            autoComplete="bookName"
            name="bookName"
            placeholder="책 제목"
            onChange={onChange}
            value={requestForm.bookTitle}
            required
          />
          <input
            className={style.styledInput}
            autoComplete="bookAuthor"
            name="bookAuthor"
            placeholder="저자"
            onChange={onChange}
            value={requestForm.bookAuthor}
            required
          />
          <input
            className={style.styledInput}
            name="rate"
            placeholder="평점"
            type="number"
            onChange={onChange}
            value={requestForm.bookRate}
            required
          />
        </div>
        <div className={style.postInfo}>
          <input
            className={style.styledInput}
            autoComplete="title"
            name="title"
            placeholder="독후감 제목"
            onChange={onChange}
            value={requestForm.title}
            required
          />
          <textarea
            className={style.content}
            name="content"
            placeholder="나만의 독후감을 작성하세요."
            type="text"
            onChange={onChange}
            value={requestForm.content}
            required
          />
        </div>
        <button
          className={style.styledButton}
          type="submit"
          onSubmit={onSubmit}
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default PostUpdateForm;
