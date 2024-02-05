import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link" href="/link" target="_blank">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="/link" target="_blank">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="/link" target="_blank">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Portfolio;