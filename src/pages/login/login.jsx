import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import './login.css';

function Login() {
  const isAuth = useSelector(selectIsAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  if (isAuth) {
    return <Navigate to="/index.html" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await dispatch(fetchAuth({ email, password }));

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="form__block">
          <form onSubmit={handleSubmit} className="form">
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder="E-mail"
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              placeholder="Пароль"
            />
            <CustomButton text="Авторизоваться" />
          </form>
          <h4 className="form__title">Не зарегистрированы?</h4>
          <Link to="/register" className="form__link">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
export { Login };
