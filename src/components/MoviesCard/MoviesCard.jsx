import React from "react";
import "./MoviesCard.css";
import moviesApiURL from "../../utils/constants";
import savedIcon from "../../images/movies/saved.svg";
import deleteIcon from '../../images/movies/delete-button.svg';

const MoviesCard = ({ movie, savedMovies, onSavedMovie, onRemoveMovie, savePage }) => {
  const filmImage = moviesApiURL + movie.image.url;
  const [savedMovie, setSavedMovie] = React.useState(false);
  const moviesTime = {
    hourse: Math.floor(movie.duration >= 60 ? movie.duration / 60 : 0),
    minutes: movie.duration >= 60 ? movie.duration % 60 : movie.duration,
  };

  // Нажатие на удаление
  const handleRemove = () => {
    onRemoveMovie(movie);
  }

  // Нажатие на сохранение
  const handleSaveButton = () => {
    if (savedMovies.some(mov => mov.movieId === movie.id)) {
      onRemoveMovie(savedMovie);
    } else {
      onSavedMovie(movie);
    }
  }

  React.useEffect(() => {
    setSavedMovie(savedMovies.find((savedMovie) => savedMovie.movieId === (movie.id || movie.movieId)));
  }, [savedMovies, movie]);

  if (savePage) { // Проверяю что это страница с сохранёнными фильмами
    return (
      <li className="movies__card">
        <div className="movies__info">
          <h2 className="movies__name">{movie?.nameRU}</h2>
          <p className="movies__time">{moviesTime.hourse}ч {moviesTime.minutes}м</p>
        </div>
        <a className="movies__link" target="_blank" rel="noreferrer" href={movie.trailerLink}><img className="movies__img" src={movie.image} alt={`Постер к фильму`} /></a>
        <button onClick={handleRemove} className="movies__button"><img className="movies__icon" src={deleteIcon} alt="Кнопка удаляющая фильм" /></button>
      </li>
    )
  } else {
    return (
      <li className="movies__card">
        <div className="movies__info">
          <h2 className="movies__name">{movie?.nameRU}</h2>
          <p className="movies__time">{moviesTime.hourse}ч {moviesTime.minutes}м</p>
        </div>
        <a className="movies__link" target="_blank" rel="noreferrer" href={movie.trailerLink}><img className="movies__img" src={filmImage} alt={`Постер к фильму`} /></a>
        {savedMovie ? (
          <button onClick={handleSaveButton} className="movies__button movies__button_type_saved" type="button"><img className="movies__icon" src={savedIcon} alt="Фильм сохранён" /></button>
        ) : (
          <button onClick={handleSaveButton} className="movies__button" type="button">Сохранить</button>
        )}
      </li>
    )
  }
};

export default MoviesCard;