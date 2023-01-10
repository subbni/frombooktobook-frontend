import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Loading from '../components/public/Loading';
import {
  getCurrentUser,
  loginProcess,
  logout,
  logoutProcess,
} from '../service/AuthService';
import { ACCESS_TOKEN } from '../constants/index';
import { Navigate } from '../../node_modules/react-router-dom/index';

function Layout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then((response) => {
        setAuthenticated(true);
        loginProcess(response);
        setCurrentUser({
          name: response.name,
          imgUrl: response.imgUrl,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const logoutHandler = () => {
    logoutProcess();
    setAuthenticated(false);
    setCurrentUser(null);
    window.alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [authenticated]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <header>
            <Header
              currentUser={currentUser}
              logoutHandler={logoutHandler}
              authenticated={authenticated}
            />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}

export default Layout;
