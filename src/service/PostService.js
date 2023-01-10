import Axios from 'axios';
import { API_BASE_URL } from '../constants/index';
import { request } from './AuthService';

class PostService {
  createPost = (postForm) => {
    return request({
      url: API_BASE_URL + '/post/create',
      method: 'POST',
      body: JSON.stringify(postForm),
    });
  };

  getPostList = (pageForm) => {
    return request({
      url:
        API_BASE_URL +
        '/post/show/page' +
        `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
      method: 'GET',
    });
  };

  getPostDetail = ({ id }) => {
    return request({
      url: API_BASE_URL + '/post/show/' + id,
      method: 'GET',
    });
  };

  getUserPostList = () => {
    const pageForm = {
      page: 0,
      size: 5,
      sort: 'id,DESC',
    };
    return request({
      url:
        API_BASE_URL +
        '/post/my?' +
        `email=${localStorage.getItem('userEmail')}&page=${
          pageForm.page
        }&size=${pageForm.size}&sort=${pageForm.sort}`,
      method: 'GET',
    });
  };

  getMostLikedPostList = () => {
    const pageForm = {
      page: 0,
      size: 5,
      sort: 'likedCount,DESC',
    };
    return request({
      url:
        API_BASE_URL +
        '/post/paging?' +
        `page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
      method: 'GET',
    });
  };

  deletePost = ({ id }) => {
    return request({
      url: API_BASE_URL + '/post/delete/' + id,
      method: 'GET',
    });
  };

  updatePost = (postForm) => {
    return request({
      url: API_BASE_URL + '/post/update',
      method: 'POST',
      body: JSON.stringify(postForm),
    });
  };

  /////////////////////////////////////////

  checkIfLikedPushed = ({ id }) => {
    const likedForm = {
      email: localStorage.getItem('userEmail'),
      postId: id,
    };
    return request({
      url: API_BASE_URL + '/liked/isPushed',
      method: 'POST',
      body: JSON.stringify(likedForm),
    });
  };

  pushedLikedButton = ({ id }) => {
    const likedForm = {
      email: localStorage.getItem('userEmail'),
      postId: id,
    };
    console.log(likedForm);
    return request({
      url: API_BASE_URL + '/liked/push',
      method: 'POST',
      body: JSON.stringify(likedForm),
    });
  };

  getLikedPostList = () => {
    return request({
      url: API_BASE_URL + '/liked/' + localStorage.getItem('userEmail'),
      method: 'GET',
    });
  };
}
export default new PostService();
