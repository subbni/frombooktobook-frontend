import Axios from 'axios';
import { API_BASE_URL } from '../constants/index';
import { request } from './AuthService';

class CommentService {
  getCommentList = ({ id }) => {
    const pageForm = {
      page: 0,
      size: 10,
      sort: 'id,ASC',
    };
    return request({
      url:
        API_BASE_URL +
        '/comment?' +
        `id=${id}&page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
      method: 'GET',
    });
  };

  createComment = (commentForm) => {
    return request({
      url: API_BASE_URL + '/comment/write',
      method: 'POST',
      body: JSON.stringify(commentForm),
    });
  };

  deleteComment = (id) => {
    return request({
      url: API_BASE_URL + '/comment/delete/' + id,
      method: 'GET',
    });
  };

  updateComment = (commentUpdateForm) => {
    return request({
      url: API_BASE_URL + '/comment/update',
      method: 'POST',
      body: JSON.stringify(commentUpdateForm),
    });
  };
}
export default new CommentService();
