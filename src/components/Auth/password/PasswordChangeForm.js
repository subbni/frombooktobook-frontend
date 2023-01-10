import { useEffect, useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import style from '../../public/style.module.css';

import AuthService from '../../../service/AuthService';
import { changePassword } from '../../../service/AuthService';
const PasswordChangeForm = () => {
  const navigate = new useNavigate();
  const [changeRequestForm, setChangeRequestForm] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [alertMsg, setAlertMsg] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  useEffect(() => {
    setChangeRequestForm({
      ...changeRequestForm,
      email: localStorage.getItem('userEmail'),
    });
  }, []);

  const onChange = (e) => {
    const changingField = e.target.name;
    setChangeRequestForm({
      ...changeRequestForm,
      [changingField]: e.target.value,
    });
  };

  const onPwdConfirmChange = (e) => {
    setPasswordConfirm(() => e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // checkPasswordConfirm();
    if (checkPasswordConfirm()) {
      setAlertMsg('');
      changePassword(changeRequestForm).then((response) => {
        if (response.success) {
          window.alert('비밀번호 변경 완료!');
          navigate(-1);
        } else {
          console.log(response.message);
          window.alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        }
      });
    } else {
      setAlertMsg('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
  };

  const checkPasswordConfirm = () => {
    if (changeRequestForm.newPassword == passwordConfirm) {
      //   setIsPasswordConfirm(true);
      return true;
    } else {
      //     setIsPasswordConfirm(false);
      return false;
    }
  };

  return (
    <div className={style.formContainer}>
      <div className={style.title}>비밀번호 변경</div>
      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          type="password"
          name="currentPassword"
          placeholder="현재 비밀번호"
          value={changeRequestForm.currentPassword}
          onChange={onChange}
          required
        />
        <input
          className={style.input}
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          value={changeRequestForm.newPassword}
          onChange={onChange}
          required
        />
        <input
          className={style.input}
          type="password"
          placeholder="새 비밀번호 확인"
          value={passwordConfirm}
          onChange={onPwdConfirmChange}
          required
        />
        <div className={style.alert}>{alertMsg}</div>

        <div>
          <button className={style.btn} type="submit" onSubmit={onSubmit}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
};
export default PasswordChangeForm;
