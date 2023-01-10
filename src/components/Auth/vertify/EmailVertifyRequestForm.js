import { useEffect, useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import style from '../vertify/Vertify.css';
import {
  requestEmailVertifyCode,
  vertifyCode,
} from '../../../service/AuthService';

const EmailVertifyRequestForm = () => {
  const navigate = new useNavigate();
  const [requestForm, setRequestForm] = useState({
    email: '',
    code: '',
  });

  useEffect(() => {
    setRequestForm({
      ...requestForm,
      email: localStorage.getItem('userEmail'),
    });
    // 뭔가 좋은 방법은 아닌 듯 한데....흠..
  }, []);

  const onChange = (e) => {
    setRequestForm({
      ...requestForm,
      code: e.target.value,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log('클릭되었습니다.');
    requestEmailVertifyCode(requestForm.email).then((response) => {
      window.alert(response.message);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(requestForm);

    vertifyCode(requestForm).then((response) => {
      window.alert(response.message);
      if (response.success) {
        navigate(-1);
      } else {
        setRequestForm({
          ...requestForm,
          code: '',
        });
      }
    });
  };

  return (
    <div className="formContainer">
      <div className="title">이메일 인증</div>
      <div className="msg">
        이메일 인증을 진행하시려면 아래 버튼을 눌러주세요.
      </div>
      <div>
        <div className="msg">현재 로그인 중인 이메일 : </div>
        <strong>{requestForm.email}</strong>
      </div>
      <button className="btn" onClick={onClick}>
        인증 번호 전송
      </button>
      <form onSubmit={onSubmit}>
        <input
          className="codeInput"
          placeholder="인증 번호"
          value={requestForm.code}
          onChange={onChange}
          required
        />
        <button className="codeBtn" type="submit" onSubmit={onSubmit}>
          확인
        </button>
      </form>
    </div>
  );
};

export default EmailVertifyRequestForm;
