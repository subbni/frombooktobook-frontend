import style from './Comment.module.css';

const CommentTemplate = ({ children }) => {
  return (
    <div className={style.templateBlock}>
      <div className={style.whiteBox}>{children}</div>
    </div>
  );
};

export default CommentTemplate;
