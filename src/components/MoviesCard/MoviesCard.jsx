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
        <div className="movies__info">
          <h2 className="movies__name">{film?.name}</h2>
          <p className="movies__time">{film?.time.hours}ч {film?.time.minutes}м</p>
        </div>
        <img className="movies__img" src={film?.image} alt={`Постер к фильму '${film.name}'`} />
        <button onClick={handleRemoveMovie} className="movies__button"><img className="movies__icon" src={deleteIcon} alt="Кнопка удаляющая фильм" /></button>
      </li>
    )
  } else {
    return (
      <li className="movies__card">
        <div className="movies__info">
          <h2 className="movies__name">{film?.name}</h2>
          <p className="movies__time">{film?.time.hours}ч {film?.time.minutes}м</p>
        </div>
        <img className="movies__img" src={film?.image} alt={`Постер к фильму '${film.name}'`} />
        {isSaved ? (
          <button onClick={handleSaveButton} className="movies__button movies__button_type_saved" type="button"><img className="movies__icon" src={savedIcon} alt="Фильм сохранён" /></button>
        ) : (
          <button onClick={handleSaveButton} className="movies__button" type="button">Сохранить</button>
        )}
      </li>
    )
  }
};

export default MoviesCard;