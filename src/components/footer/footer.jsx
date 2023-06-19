import { Link } from 'react-router-dom';
import logo from '/logo.svg';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link to="/index.html" className="logo">
          <img src={logo} className="foooter__logo" />
        </Link>
      </div>
    </footer>
  );
}

export { Footer };
