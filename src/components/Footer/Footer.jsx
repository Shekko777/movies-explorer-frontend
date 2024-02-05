import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__date">© 2020</p>
          <ul className="footer__links">
            <li className="footer__link-item">
              <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a className="footer__link" href="https://github.com/Shekko777" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;