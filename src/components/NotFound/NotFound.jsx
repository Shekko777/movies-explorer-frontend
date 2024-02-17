import {  useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button onClick={handleClickButton} className="not-found__button">Назад</button>
    </section>
  )
}

export default NotFound;