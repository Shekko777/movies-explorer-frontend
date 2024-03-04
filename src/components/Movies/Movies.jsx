import './Movies.css';
import React from "react";
import { useResize } from "../../hooks/useResize";
// Компоненты:
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

const Movies = ({ onGetMovies, onSavedMovie, onRemoveMovie, savedMovies, onSetSavedMovies }) => {
  const windowSize = useResize(); 
  const [quantityCards, setQuantityCards] = React.useState(windowSize.quantity);
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('saveMovies')) || []);
  const [moviesForRender, setMoviesForRender] = React.useState(JSON.parse(localStorage.getItem('saveResultMovie')) || []);
  const [movieTitle, setMovieTitle] = React.useState(JSON.parse(localStorage.getItem('saveMovieTitle')) || '');
  const [checkedStatus, setCheckedStatus] = React.useState(JSON.parse(localStorage.getItem('saveCheckedStatus')) || false);
  const [preloaderStatus, setPreloaderStatus] = React.useState(false); 
  const [searchMessage, setSearchMessage] = React.useState('');
  const renderMovies = moviesForRender.slice(0, quantityCards);

  const handleSubmit = (movieName) => {
    localStorage.setItem('saveMovieTitle', JSON.stringify(movieTitle));
    if (movies.length === 0) {
      setPreloaderStatus(true);
      onGetMovies()
        .then(resMovies => {
          localStorage.setItem('saveMovies', JSON.stringify(resMovies))
          setMovies(resMovies);
          if (checkedStatus) {
            setMoviesForRender(resMovies.filter(m => m.duration <= 40 && (m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName))));
          } else {
            setMoviesForRender(resMovies.filter(m => m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName)));
          }
        })
        .catch(() => {
          setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(_ => {
          setPreloaderStatus(false);
        })
    } else {
      if (checkedStatus) {
        setMoviesForRender(movies.filter(m => m.duration <= 40 && (m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName))));
      } else {
        setMoviesForRender(movies.filter(m => m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName)));
      }
    }
  };

  const handleChecked = () => {
    setCheckedStatus(!checkedStatus);
  };

  const handleButtonShowMore = () => {
    if (quantityCards >= moviesForRender?.length) {
      return;
    } else {
      setQuantityCards(state => state + windowSize.term);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('saveCheckedStatus', JSON.stringify(checkedStatus));
  }, [checkedStatus])

  React.useEffect(() => {
    localStorage.setItem('saveResultMovie', JSON.stringify(moviesForRender));
  }, [moviesForRender])

  return (
    <main className="movies main">
      <div className="movies__container">
        <SearchForm onSubmit={handleSubmit} movies={movies} savedSearch={true} checkedStatus={checkedStatus} onChecked={handleChecked} movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
        {preloaderStatus ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={moviesForRender} searchMessage={searchMessage}>
            {renderMovies?.map((movie) => <MoviesCard key={movie.id} movie={movie} savedMovies={savedMovies} onSavedMovie={onSavedMovie} onRemoveMovie={onRemoveMovie} setSavedMovies={onSetSavedMovies} />)}
          </MoviesCardList>
        )}
        {moviesForRender && !preloaderStatus ? <button onClick={handleButtonShowMore} type="button" className={quantityCards >= moviesForRender?.length ? "movies__more movies__more_type_disabled" : "movies__more"} disabled={quantityCards >= moviesForRender?.length}>Ещё</button> : <></>}
      </div>
    </main>
  )
}

export default Movies;