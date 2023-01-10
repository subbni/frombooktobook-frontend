import { useEffect, useState } from 'react';
import style from './css/Post.module.css';
import Axios from 'axios';
import PostService from '../../service/PostService';
import { checkIfAuthenticated } from '../../service/AuthService';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const PostWriteForm = () => {
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState({
    userEmail: '',
    title: '',
    content: '',
    book: {},
  });
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    rate: -1,
  });

  useEffect(() => {
    if (!checkIfAuthenticated()) {
      navigate(-1);
    }
    setPostForm({
      ...postForm,
      userEmail: localStorage.getItem('userEmail'),
    });
  }, []);

  const onChange = (e) => {
    const changingField = e.target.name;
    setPostForm({
      ...postForm,
      [changingField]: e.target.value,
    });
  };

  const onBookChange = (e) => {
    const changingField = e.target.name;
    setBookForm({
      ...bookForm,
      [changingField]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPostForm({
      ...postForm,
      book: bookForm,
    });
    PostService.createPost(postForm).then(() => {
      alert('등록 완료!');
    });
  };

  return (
    <div className={style.formBlock}>
      <h3>독후감 작성</h3>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.bookInfo}>
          <input
            className={style.styledInput}
            autoComplete="bookName"
            name="bookName"
            placeholder="책 제목"
            onChange={onBookChange}
            required
          />
          <input
            className={style.styledInput}
            autoComplete="bookAuthor"
            name="bookAuthor"
            placeholder="저자"
            onChange={onBookChange}
            required
          />
          <input
            className={style.styledInput}
            name="rate"
            placeholder="평점"
            type="number"
            onChange={onBookChange}
            required
            max={5}
            min={1}
          />
        </div>
        <div className={style.postInfo}>
          <input
            className={style.styledInput}
            autoComplete="title"
            name="title"
            placeholder="독후감 제목"
            onChange={onChange}
            required
          />
          <textarea
            className={style.content}
            name="content"
            placeholder="나만의 독후감을 작성하세요."
            type="text"
            onChange={onChange}
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

export default PostWriteForm;
