import './AboutMe.css';
import avatarJpg from '../../images/about-me/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__container container">
        <h2 className="title about-me__title">Студент</h2>
        <div className="about-me__info">
          <div className="about-me__info-wrapper">
            <h3 className="about-me__name">Иван</h3>
            <p className="about-me__description">Front-end developer</p>
            <p className="about-me__text">Я закончил учебу по системным комплексам, и по диплому являюсь системным администратором 👨‍💻. Это мне не сильно понравилось, и в 2023 году я решил кардинально сменить род деятельности. Пошел обучаться в Яндекс.Практикум на Web-разработчика, где научили владеть не только фронтенд разработкой, но и серверными технологиями. Отчасти считаются Full-stack Developer.</p>
            <a className="about-me__github-link" href="https://github.com/Shekko777" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
          <img className="about-me__avatar" src={avatarJpg} alt="Фотография моего профиля" />
        </div>
      </div>

    </section>
  )
}

export default AboutMe;