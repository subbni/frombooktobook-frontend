import { useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_MSEC,
} from '../../../constants/index';
import AuthService from '../../../service/AuthService';
import style from './Login.module.css';
import Cookies from '../../../../node_modules/universal-cookie/cjs/Cookies';
import { login, loginProcess } from '../../../service/AuthService';
const LoginForm = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const changingField = e.target.name;
    setLoginForm({
      ...loginForm,
      [changingField]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(loginForm)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        loginProcess(response);
        window.alert('로그인 되었습니다.');
        window.location.reload();
        navigate(-1);
      })
      .catch((e) => {
        console.log(e + e.message);
        window.alert('로그인에 실패하였습니다. 다시 시도해주세요.');
        //window.location.reload();
      });
  };

  return (
    <div className={style.formContainer}>
      <div className={style.title}>로그인</div>
      <div className={style.msg}>FromBookToBook에 오신걸 환영합니다! </div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className={style.input}
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <button className={style.btn} type="submit" onSubmit={onSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
