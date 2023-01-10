import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { useEffect, useState } from 'react';
import AuthService, { checkIfAuthenticated } from '../service/AuthService';
import anonymous_profile from '../image/anonymous_profile.png';
import { useNavigate } from '../../node_modules/react-router-dom/index';

const Header = ({ currentUser, logoutHandler, authenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    imgUrl: '',
  });
  const [imgUrl, setImgUrl] = useState({
    uri: '',
  });

  useEffect(() => {
    if (currentUser !== null) {
      setUser({
        name: currentUser.name,
        imgUrl: currentUser.imgUrl,
      });
      setImgUrl({
        uri: currentUser.imgUrl,
      });
    }

    // if (localStorage.getItem('authenticated')) {
    //   setUser({
    //     name: localStorage.getItem('userName'),
    //   });
    //   setAuthenticated(true);
    // } else if (authenticated) {
    //   setUser({
    //     name: currentUser.name,
    //     imgUrl: currentUser.imgUrl,
    //   });
    //  setAuthenticated(true);
    console.log(currentUser);
    //}
  }, [currentUser, authenticated]);

  return (
    <div className={style.navbar}>
      <div>
        <Link to="/" className={style.logo}>
          FromBookToBook
        </Link>
      </div>

      <ul className={style.menu}>
        <li>
          <Link to="/post/write">독후감</Link>
        </li>
        <li>
          <Link to="/post">둘러보기</Link>
        </li>
      </ul>

      <div className={style.mypage}>
        {user.name === '' ? (
          <Link to="/login">로그인</Link>
        ) : (
          <div className={style.profile}>
            <Link to="my">
              {user.imgUrl === null ? (
                <img className={style.profile__img} src={anonymous_profile} />
              ) : (
                <img
                  className={style.profile__img}
                  src={imgUrl.uri}
                  referrerPolicy="no-referrer"
                />
              )}
            </Link>
            <div className={style.profile__name}>{user.name}</div>
          </div>
        )}

        {authenticated ? (
          <p
            className={style.logout}
            onClick={logoutHandler}
            onFocus={PointerEvent}
          >
            로그아웃
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
