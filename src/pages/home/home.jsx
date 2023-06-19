import { Link } from 'react-router-dom';
import linkIcon from '/link.svg';
import dogImage from '/dog.png';
import catImage from '/cat.png';
import './home.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

function Home() {
  const isAuth = useSelector(selectIsAuth);
  return (
    <div className="home">
      <div className="container home__container">
         
        <div className="home__top">
          <div className="home__block">
            <h1 className="home__title">
              Найди нового питомца и забери его из приюта
            </h1>
            <Link to="/pets" className="home__link">
              Посмотреть питомцев
              <img src={linkIcon} className="home__link-img" />
            </Link>
            {isAuth ? null : (
              <>
                <p className="home__text">Вы владеете приютом?</p>
                <p className="home__text">
                  Зарегистрируйте его на нашем сайте и сможете выкладывать
                  объявления, чтобы найти животным новый дом.
                </p>
                <Link to="/register" className="home__link">
                  Регистрация
                  <img src={linkIcon} className="home__link-img" />
                </Link>
              </>
            )}
          </div>
          <div className="home__image-block">
            <img src={catImage} className="home__image home__image--small" />
            <img src={dogImage} className="home__image" />
          </div>
        </div>
        <h1 className="home__title">
          Нас можно найти по адресу:
        </h1>
        <iframe
          className="home__map"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A0eb87bb5dc1c6bb91b2db4304cda18b285eb91487da38fcda5826946d42827d9&amp;source=constructor"
          width="500"
          height="400"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
}

export { Home };
