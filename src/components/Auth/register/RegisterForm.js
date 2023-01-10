import { useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import AuthService from '../../../service/AuthService';
import style from '../login/Login.module.css';
import { register } from '../../../service/AuthService';
const RegisterForm = () => {
  const navigate = new useNavigate();
  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const onChange = (e) => {
    const changingField = e.target.name;
    setRegisterForm({
      ...registerForm,
      [changingField]: e.target.value,
    });
    console.log(registerForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(registerForm);

    register(registerForm)
      .then((response) => {
        window.alert('회원가입이 완료되었습니다. 환영합니다! <3 ');
        navigate(-1);
      })
      .catch((e) => {
        console.log(e + e.message);
        window.alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        window.location.reload();
      });
  };

  return (
    <div className={style.formContainer}>
      <div className={style.title}>회원가입</div>
      <div className={style.msg}>
        FromBookToBook에서 당신의 독후감을 기록하세요.
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className={style.input}
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            className={style.input}
            type="name"
            name="name"
            placeholder="name"
            value={registerForm.name}
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
            value={registerForm.password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <button className={style.btn} type="submit" onSubmit={onSubmit}>
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
