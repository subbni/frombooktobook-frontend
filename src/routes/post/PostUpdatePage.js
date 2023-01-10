import PageTemplate from '../../components/public/PageTemplate';
import PostUpdateForm from '../../components/post/PostUpdateForm';
import { useEffect } from 'react';

const PostUpdatePage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <PageTemplate>
        <PostUpdateForm />
      </PageTemplate>
    </>
  );
};

export default PostUpdatePage;
