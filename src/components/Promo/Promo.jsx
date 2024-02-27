import promoBanner from '../../images/promo/promo-banner.svg';
import './Promo.css';

const Promo = () => {
  const handleButtonClick = () => {
    document.querySelector('.about-project').scrollIntoView({behavior: "smooth"})
  }

  return (
    <section className="promo">
      <div className="promo__container container">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button onClick={handleButtonClick} className="promo__button">Узнать больше</button>
        </div>
        <img className="promo__img" src={promoBanner} alt="Картинка баннера" />
      </div>
    </section>
  )
}

export default Promo;