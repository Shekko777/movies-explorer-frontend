import "./MoviesCard.css";
import savedIcon from "../../images/movies/saved.svg";
import React from "react";

const MoviesCard = ({ name, time, image, film, children }) => {
  const [saved, setSaved] = React.useState(film.saved);

  const handleClick = () => {
    setSaved(!saved);
  }

  return (
    <li className="moies__card">
      <div className="movies__card-info">
        <p className="movies__card-name">{name}</p>
        <p className="movies__card-time">{time.hours}ч {time.minutes}м</p>
      </div>
      <img className="movies__card-img" src={image} alt="Картинка фильма" />
      {/* {children} */}
      {saved ? (
        <button onClick={handleClick} className="movies__card-button movies__card-button_type_saved" type="button"><img className="movies__card-icon" src={savedIcon} alt="Фильм сохранён" /></button>
      ) : (
        <button onClick={handleClick} className="movies__card-button" type="button">Сохранить</button>
      )}
    </li>
  )
}

export default MoviesCard;