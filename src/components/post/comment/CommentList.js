import { useEffect, useState, useMemo } from 'react';
import CommentService from '../../../service/CommentService';
import style from './Comment.module.css';

const CommentList = (id) => {
  const [commentList, setCommentList] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  const [updateContent, setUpdateContent] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    CommentService.getCommentList(id).then((response) => {
      setCommentList(response.content);
      setTotalPages(response.totalPages);
      console.log(response);
    });
  }, []);

  const onDeleteBtnClick = (e) => {
    console.log(e.target.id);

    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      CommentService.deleteComment(e.target.id).then((response) => {
        window.alert('삭제되었습니다.');
        // commentList에서 해당 삭제 댓글을 빼주면 되는거 아닌가? 흠 좀 고민이 되는군요
      });
      window.location.reload();
    }
  };

  const onUpdateBtnClick = (content, e) => {
    setIsSelected(() => e.target.id);
    setUpdateContent(() => content);
  };

  const onChange = (e) => {
    setUpdateContent(e.target.value);
  };

  const onUpdateConfirmBtnClick = (e) => {
    if (updateContent == null) {
      window.alert('댓글을 1자 이상 입력해주세요.');
    } else {
      const commentUpdateForm = {
        commentId: e.target.id,
        content: updateContent,
      };

      CommentService.updateComment(commentUpdateForm).then((response) => {
        window.alert('수정되었습니다!');
      });
      window.location.reload();
      setIsSelected(() => null);
      setUpdateContent(() => null);
    }
  };

  const onUpdateCancleBtnClick = (e) => {
    setIsSelected(() => null);
  };

  return (
    <div className={style.commentList}>
      <div className={style.title}>댓글</div>
      {commentList.map((comment) => (
        <ul className={style.ul}>
          {isSelected == comment.id ? (
            <li className={style.commentUpdateForm} key={comment.id}>
              <input
                className={style.updateInput}
                type="text"
                onChange={onChange}
                value={updateContent}
              />

              <div className={style.updateBtn}>
                <button
                  id={comment.id}
                  className={style.styledButton}
                  onClick={onUpdateConfirmBtnClick}
                >
                  등록
                </button>
                <button
                  className={style.styledButton}
                  onClick={onUpdateCancleBtnClick}
                >
                  취소
                </button>
              </div>
            </li>
          ) : (
            <li key={comment.id} className={style.updateForm}>
              <div>{comment.email}</div>

              <div>{comment.content}</div>
              <div>
                {comment.localDateTime.substring(0, 10)}
                {comment.writer == true ? (
                  <div>
                    <button
                      className={style.TextBtn}
                      id={comment.id}
                      onClick={(e) => onUpdateBtnClick(comment.content, e)}
                    >
                      수정
                    </button>
                    <button
                      className={style.TextBtn}
                      id={comment.id}
                      onClick={onDeleteBtnClick}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          )}
        </ul>
      ))}
    </div>
  );
};

export default CommentList;
