import PageTemplate from '../../components/public/PageTemplate';
import PostWriteForm from '../../components/post/PostWriteForm';
import { useEffect } from 'react';

const PostWritePage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <PageTemplate>
        <PostWriteForm />
      </PageTemplate>
    </>
  );
};
export default PostWritePage;
