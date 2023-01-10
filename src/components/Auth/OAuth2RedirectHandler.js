import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { NavLink } from 'react-router-dom';
import { Navigate } from '../../../node_modules/react-router-dom/index';
/**
 * this component is loaded when the user has completed the OAuth2 authentication flow with the server.
 * The server redirects the user to this page with an access token if the authentication was successful,
 * or an error if it failed.
 */

class OAuth2RedirectHandler extends Component {
  getParameter(name) {
    const href = window.location.href;
    let params = new URL(document.location).searchParams;
    let code = params.get(name);
    return code;
  }

  render() {
    const token = this.getParameter('token');
    const error = this.getParameter('error');
    console.log(`token = ${token}`);
    /**
     * 성공적으로 인증되어 accesstoken을 가지고 있는 경우, query string으로 부터 가져와서 로컬저장소에 저장, 홈으로 리다이렉트.
     * 실패하여 error를 가지고 있는 경우, login 페이지로 리다이렉트.
     */
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      console.log(`token = ${token}`);
      return window.location.replace('/');
    } else {
      console.log(error);
      return window.location.replace('/login');
    }
  }
}

export default OAuth2RedirectHandler;
