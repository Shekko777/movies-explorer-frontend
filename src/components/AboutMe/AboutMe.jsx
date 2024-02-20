import './AboutMe.css';
import avatarJpg from '../../images/about-me/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__container container">
        <h2 className="title about-me__title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__info-wrapper">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className="about-me__github-link" href="https://github.com/Shekko777" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
          <img className="about-me__avatar" src={avatarJpg} alt="Моя фотография" />
        </div>
      </div>

    </section>
  )
}

export default AboutMe;