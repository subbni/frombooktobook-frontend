import { useEffect, useRef, useState } from 'react';
import PostService from '../../service/PostService';
import main_image from '../../image/mainpage/fbtb_main2.png';
import anonymous_profile from '../../image/anonymous_profile.png';
import './home.css';
const MostLikedPostListTable = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // PostService.getMostLikedPostList().then((response) => {
    //   setPostList(response.content);
    //   console.log(response);
    // });
  }, []);

  return (
    <div className="homepage">
      <img className="image" src={main_image} alt="mainPage" />
    </div>
  );
};
export default MostLikedPostListTable;
