import Axios from 'axios';
import { API_BASE_URL } from '../constants/index';
import { request } from './AuthService';

class TestService {
  testRequest = () => {
    return request({
      url: API_BASE_URL + '/user/test',
      method: 'GET',
    });
  };
}

export default new TestService();
