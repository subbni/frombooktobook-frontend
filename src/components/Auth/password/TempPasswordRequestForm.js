import { useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import AuthService from '../../../service/AuthService';
import style from '../../public/style.module.css';
import { requestTempPassword } from '../../../service/AuthService';

const TempPasswordRequestForm = () => {
  const navigate = new useNavigate();
  const [email, setEmail] = useState('');
  const onChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    requestTempPassword(email).then((response) => {
      window.alert(response.message);
      if (response.success) {
        navigate('/login');
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <div className={style.title}>임시 비밀번호 발급</div>
      <div className={style.msg}>
        가입하신 이메일을 입력하시면, 해당 이메일로 임시비밀번호를 보내드립니다.
      </div>

      <form onSubmit={onSubmit}>
        <input
          className={style.input}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
          required
        />
        <button className={style.btn} type="submit" onSubmit={onSubmit}>
          send
        </button>
      </form>
    </div>
  );
};

export default TempPasswordRequestForm;
