import { useEffect, useState } from 'react';
import LikedPostList from '../components/mypage/LikedPostList';
import MyPostList from '../components/mypage/MyPostList';
import PostService from '../service/PostService';
import PageTemplate from '../components/public/PageTemplate';

const MyPage = () => {
  return (
    <PageTemplate>
      <MyPostList />
      <LikedPostList />
    </PageTemplate>
  );
};

export default MyPage;
