import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://shekko777.github.io/how-to-learn/" target="_blank" rel="noopener noreferrer">Статичный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://shekko777.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://shekko777.github.io/react-mesto-auth/#/" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;