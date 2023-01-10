import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from '../../../constants/index';
import { logout } from '../../../service/AuthService';
import googleLogo from '../../../image/provider_logo/btn_google_signin_light_normal_web@2x.png';
import naverLogo from '../../../image/provider_logo/btn_naver.png';
import kakaoLogo from '../../../image/provider_logo/kakao_login_large_narrow.png';

import style from './Login.module.css';
const SocialLogin = () => {
  return (
    <div>
      <hr className={style.seperateBar} />
      <div className={style.seperateMsg}>SNS 계정으로 간편 로그인</div>
      <div className={style.SNSLogin}>
        <a href={GOOGLE_AUTH_URL} className={style.socialLogin}>
          <img className={style.logo} src={googleLogo} alt="Google" />
        </a>
        <a href={NAVER_AUTH_URL} className={style.socialLogin}>
          <img className={style.logo} src={naverLogo} alt="Naver" />
        </a>
        <a href={KAKAO_AUTH_URL} className={style.socialLogin}>
          <img className={style.logo} src={kakaoLogo} alt="Kakao" />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
