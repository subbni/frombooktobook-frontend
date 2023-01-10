import Axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

export const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  return request({
    url: API_BASE_URL + '/user/me',
    method: 'GET',
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + '/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
}

export function register(registerRequest) {
  return request({
    url: API_BASE_URL + '/auth/register',
    method: 'POST',
    body: JSON.stringify(registerRequest),
  });
}

export function loginProcess(response) {
  console.log(response);

  localStorage.setItem('authenticated', true);
  localStorage.setItem('userName', response.name);
  localStorage.setItem('userEmail', response.email);
  localStorage.setItem('imgUrl', response.imgUrl);
}

export function logoutProcess() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('imgUrl');
  window.location.reload();
}

export function checkIfAuthenticated() {
  if (!localStorage.getItem('authenticated')) {
    window.alert('로그인이 필요한 서비스입니다.');
    return false;
  }
  return true;
}

export function requestTempPassword(email) {
  return request({
    url: API_BASE_URL + '/auth/tempPassword/' + email,
    method: 'GET',
  });
}

export function changePassword(requestForm) {
  console.log(requestForm);
  return request({
    url: API_BASE_URL + '/user/changePassword',
    method: 'POST',
    body: JSON.stringify(requestForm),
  });
}

export function requestEmailVertifyCode(email) {
  return request({
    url: API_BASE_URL + '/auth/vertify/' + email,
    method: 'GET',
  });
}

export function vertifyCode(requestForm) {
  return request({
    url: API_BASE_URL + '/auth/vertify/email',
    method: 'POST',
    body: JSON.stringify(requestForm),
  });
}

class AuthService {}
export default new AuthService();
