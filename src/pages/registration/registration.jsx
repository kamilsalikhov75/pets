import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomInput } from '../../components/custom-input/custom-input';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import './registration.css';

function Registration() {
  const isAuth = useSelector(selectIsAuth);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await dispatch(
      fetchRegister({ email, name, address, phone, password })
    );

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/index.html" />;
  }

  return (
    <div className="registration">
      <div className="container">
        <div className="form__block">
          <form onSubmit={handleSubmit} className="form">
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder="E-mail"
            />
            <CustomInput
              value={name}
              setValue={setName}
              placeholder="Название приюта"
            />
            <CustomInput
              value={address}
              setValue={setAddress}
              placeholder="Адрес приюта"
            />
            <CustomInput
              value={phone}
              setValue={setPhone}
              placeholder="Номер телефона"
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              placeholder="Пароль"
            />
            <CustomButton text="Зарегистрироваться" />
          </form>
          <h4 className="form__title">Уже зарегистрированы?</h4>
          <Link to="/login" className="form__link">
            Авторизация
          </Link>
        </div>
      </div>
    </div>
  );
}
export { Registration };
