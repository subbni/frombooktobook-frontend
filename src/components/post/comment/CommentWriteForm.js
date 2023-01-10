import { useEffect, useState } from 'react';
import style from './Comment.module.css';
import CommentService from '../../../service/CommentService';

const CommentWriteForm = ({ id }) => {
  // 나 진짜 ... 프론트엔드 너무 싫다 ...
  const [commentForm, setCommentForm] = useState({
    email: '',
    postId: '',
    content: '',
  });

  useEffect(() => {
    setCommentForm({
      ...commentForm,
      email: localStorage.getItem('userEmail'),
      postId: id,
    });
  }, []);

  const onChange = (e) => {
    setCommentForm({
      ...commentForm,
      content: e.target.value,
    });
    console.log(commentForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(commentForm);
    CommentService.createComment(commentForm).then(() => {
      setCommentForm({
        ...commentForm,
        content: '',
      });
      alert('등록 완료!');
      window.location.reload();
    });
  };

  return (
    <div>
      <form className={style.form} onSubmit={onSubmit}>
        <textarea
          className={style.styledInput}
          placeholder="댓글을 입력해주세요."
          type="text"
          value={commentForm.content}
          onChange={onChange}
          required
        />
        <button
          className={style.styledButton}
          type="submit"
          onSubmit={onSubmit}
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
};

export default CommentWriteForm;
