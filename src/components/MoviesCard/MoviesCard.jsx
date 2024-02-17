import React from "react";
import "./MoviesCard.css";
import savedIcon from "../../images/movies/saved.svg";
import deleteIcon from '../../images/movies/delete-button.svg';

const MoviesCard = ({ film, savedFilm }) => {
  const ref = React.useRef();
  const [isSaved, setIsSaved] = React.useState(film.saved);

  const handleRemoveMovie = () => {
    ref.current.remove();
  }

  const handleSaveButton = () => {
    setIsSaved(!isSaved);
  }

  if (savedFilm) {
    return (
      <li ref={ref} className="movies__card">
        <div className="movies__card-info">
          <p className="movies__card-name">{film?.name}</p>
          <p className="movies__card-time">{film?.time.hours}ч {film?.time.minutes}м</p>
        </div>
        <img className="movies__card-img" src={film?.image} alt="Картинка фильма" />
        <button onClick={handleRemoveMovie} className="movies__card-button"><img className="movies__card-icon" src={deleteIcon} alt="Кнопка удаляющая фильм" /></button>
      </li>
    )
  } else {
    return (
      <li className="movies__card">
        <div className="movies__card-info">
          <p className="movies__card-name">{film?.name}</p>
          <p className="movies__card-time">{film?.time.hours}ч {film?.time.minutes}м</p>
        </div>
        <img className="movies__card-img" src={film?.image} alt="Картинка фильма" />
        {isSaved ? (
          <button onClick={handleSaveButton} className="movies__card-button movies__card-button_type_saved" type="button"><img className="movies__card-icon" src={savedIcon} alt="Фильм сохранён" /></button>
        ) : (
          <button onClick={handleSaveButton} className="movies__card-button" type="button">Сохранить</button>
        )}
      </li>
    )
  }
};

export default MoviesCard;