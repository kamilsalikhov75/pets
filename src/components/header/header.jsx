import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.svg';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

const menuText = {
  default: 'Открыть меню',
  active: 'Закрыть меню',
};

const navigationClass = {
  default: 'header__navigation',
  active: 'header__navigation header__navigation--active',
};

function Header() {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.auth);
  const [buttonText, setButtonText] = useState(menuText.default);
  const [navClass, setNavClass] = useState(navigationClass.default);
  const dispatch = useDispatch();
  function toggleMenu() {
    if (buttonText === menuText.default) {
      setButtonText(menuText.active);
      setNavClass(navigationClass.active);
    } else {
      setButtonText(menuText.default);
      setNavClass(navigationClass.default);
    }
  }

  function handleLogout() {
    dispatch(logout());
    window.localStorage.removeItem('token');
  }

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/index.html" className="logo">
          <img src={logo} className="header__image" />
        </Link>
        <button
          onClick={toggleMenu}
          className="header__button header__button--menu"
        >
          {buttonText}
        </button>
        <nav className={navClass}>
          <Link to="/index.html" className="header__link header__link--menu">
            Главная
          </Link>
          <Link to="/pets" className="header__link">
            Посмотреть животных
          </Link>
          {isAuth ? (
            <>
              <Link to="/pets/add" className="header__link">
                Добавить объявление
              </Link>
              <Link
                to={`/shelter-pets/${user.data.userData._id}`}
                className="header__link"
              >
                Животные приюта
              </Link>
              <button
                onClick={handleLogout}
                className="header__button header__button--logout"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/register" className="header__link">
              Зарегистрировать приют
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export { Header };
