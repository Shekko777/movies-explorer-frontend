import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project">
      <div className="about-project__container container">
        <h2 className="title about-project__title">О проекте</h2>

        <ul className="about-project__items">
          <li className="about-project__item">
            <h3 className="about-project__item-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__item">
            <h3 className="about-project__item-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>

        <ul className="about-project__lines">
          <li className="about-project__line about-project__line_type_backend">
            <p className="about-project__line-text">1 неделя</p>
          </li>
          <li className="about-project__line about-project__line_type_frontend">
            <p className="about-project__line-text">4 недели</p>
          </li>
        </ul>
        
      </div>
    </section>
  )
}

export default AboutProject;