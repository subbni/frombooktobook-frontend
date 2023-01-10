import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Router, Route, Routes } from 'react-router-dom';
import Home from '../routes/Home';
import PostWritePage from '../routes/post/PostWritePage';
import Header from './Header';
import PostListPage from '../routes/post/PostListPage';
import PostUpdatePage from '../routes/post/PostUpdatePage';
import Layout from './Layout';
import LoginPage from '../routes/LoginPage';
import { getCurrentUser, logout } from '../service/AuthService';
import { ACCESS_TOKEN } from '../constants/index';
import OAuth2RedirectHandler from '../components/Auth/OAuth2RedirectHandler';
import RegisterPage from '../routes/RegisterPage';
import PostDetailPage from '../routes/post/PostDetailPage';
import MyPage from '../routes/MyPage';
import TempPasswordPage from '../routes/TemporaryPasswordPage';
import PasswordChangePage from '../routes/PasswordChangePage';
import EmailVertifyPage from '../routes/EmailVertifyPage';
import TestPage from '../routes/TestPage';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/write" element={<PostWritePage />} />
            <Route path="/post/update" element={<PostUpdatePage />} />
            <Route path="/post" element={<PostListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/password/temp" element={<TempPasswordPage />} />
            <Route path="/password/change" element={<PasswordChangePage />} />
            <Route path="/email/vertify" element={<EmailVertifyPage />} />
            <Route path="/user/test" element={<TestPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
