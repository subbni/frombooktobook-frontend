import { GOOGLE_AUTH_URL, GOOGLE_OAUTH_BTN_URL } from '../constants/index';

import LoginForm from '../components/Auth/login/LoginForm';
import SocialLogin from '../components/Auth/login/SocialLogin';
import style from '../components/Auth/login/Login.module.css';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/public/PageTemplate';
const LoginPage = () => {
  return (
    <PageTemplate>
      <LoginForm />
      <SocialLogin />
      <NotYetJoinUs />
      <WhenYouForgetPassword />
    </PageTemplate>
  );
};

const NotYetJoinUs = () => {
  return (
    <>
      <div className={style.smallText}>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/register" className={style.join}>
          Join
        </Link>
      </div>
    </>
  );
};

const WhenYouForgetPassword = () => {
  return (
    <div className={style.smallText}>
      비밀번호가 기억이 안 나시나요?&nbsp;
      <Link to="/password/temp" className={style.join}>
        Click
      </Link>
    </div>
  );
};

export default LoginPage;
