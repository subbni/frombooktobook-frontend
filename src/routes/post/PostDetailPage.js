import { useEffect, useState } from 'react';
import PostDetail from '../../components/post/PostDetail';
import { useParams, useNavigate } from 'react-router-dom';
import CommentWriteForm from '../../components/post/comment/CommentWriteForm';
import CommentList from '../../components/post/comment/CommentList';
import PageTemplate from '../../components/public/PageTemplate';

const PostDetailPage = () => {
  let { id } = useParams();

  return (
    <>
      <PageTemplate>
        <PostDetail id={id} />
      </PageTemplate>
      <PageTemplate>
        <CommentList id={id} />
        <CommentWriteForm id={id} />
      </PageTemplate>
    </>
  );
};
export default PostDetailPage;
