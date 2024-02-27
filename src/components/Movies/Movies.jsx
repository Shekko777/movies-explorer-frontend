import './Movies.css';
import React from "react";
import { useResize } from "../../hooks/useResize";
// Компоненты:
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

const Movies = ({ getMovies, handleSavedMovie, handleRemoveMovie, savedMovies, setSavedMovies }) => {
  const windowSize = useResize(); // Хук проверки ширины экрана
  const [quantityCards, setQuantityCards] = React.useState(windowSize.quantity); // Устанавливает кол-во отоброжаемых карточек
  const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem('saveMovies')) || []);
  const [moviesForRender, setMoviesForRender] = React.useState(JSON.parse(localStorage.getItem('saveResultMovie')) || []);
  const [movieTitle, setMovieTitle] = React.useState(JSON.parse(localStorage.getItem('saveMovieTitle')) || '');
  const [checkedStatus, setCheckedStatus] = React.useState(JSON.parse(localStorage.getItem('saveCheckedStatus')) || false);
  const [preloaderStatus, setPreloaderStatus] = React.useState(false); // Прелоадер
  const [searchMessage, setSearchMessage] = React.useState('');
  const renderItems = moviesForRender.slice(0, quantityCards);

  const handleSubmit = (movieName) => {
    localStorage.setItem('saveMovieTitle', JSON.stringify(movieTitle));
    if (movies.length === 0) {
      setPreloaderStatus(true);
      getMovies()
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
      setQuantityCards(state => state + windowSize.term); //windowSize.term - Устанавливает сколько карточек должно добавляться.
    }
  };

  React.useEffect(() => {
    localStorage.setItem('saveCheckedStatus', JSON.stringify(checkedStatus));
  }, [checkedStatus])

  React.useEffect(() => {
    localStorage.setItem('saveResultMovie', JSON.stringify(moviesForRender));
  }, [moviesForRender])

  React.useEffect(() => {

  }, [])

  return (
    <main className="movies main">
      <div className="movies__container">
        <SearchForm handleSubmit={handleSubmit} movies={movies} savedSearch={true} checkedStatus={checkedStatus} handleChecked={handleChecked} movieTitle={movieTitle} setMovieTitle={setMovieTitle} />
        {preloaderStatus ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={moviesForRender} searchMessage={searchMessage}>
            {renderItems?.map((movie, index) => (<MoviesCard key={index} movie={movie} savedMovies={savedMovies} handleSavedMovie={handleSavedMovie} handleRemoveMovie={handleRemoveMovie} setSavedMovies={setSavedMovies} />))}
          </MoviesCardList>
        )}
        {moviesForRender && !preloaderStatus ? <button onClick={handleButtonShowMore} type="button" className={quantityCards >= moviesForRender?.length ? "movies__more movies__more_type_disabled" : "movies__more"} disabled={quantityCards >= moviesForRender?.length}>Ещё</button> : <></>}
      </div>
    </main>
  )
}

export default Movies;








// // Работа кнопки "Ещё"
// const handleButtonShowMore = () => {
//   if (quantityCards >= movies?.length) {
//     return;
//   } else {
//     setQuantityCards(quantityCards + windowSize.term); //windowSize.term - Устанавливает сколько карточек должно добавляться.
//   }
// }

// // Отправка формы поиска фильмов
// const handleSubmit = (movieName) => {
//   localStorage.setItem('savedMovieTitle', JSON.stringify(movieTitle));
//   console.log(Boolean(movies.length == 0))
//   console.log(movies)
//   console.log(moviesForRender)
//   setPreloaderStatus(true);
//   if (movies.length === 0) {
//     getMovies()
//       .then(resMovies => {
//         setMovies(resMovies);
//         localStorage.setItem('savedMoviesMain', resMovies);
//         if (checkedStatus) {
//           setMoviesForRender(resMovies.filter(mov => mov.duration <= 40 && (mov.nameRU.toLowerCase().includes(movieName.toLowerCase()) || mov.nameEN.toLowerCase().includes(movieName.toLowerCase()))));
//         } else {
//           setMoviesForRender(resMovies.filter(mov => mov.nameRU.toLowerCase().includes(movieTitle.toLowerCase()) || mov.nameEN.toLowerCase().includes(movieName.toLowerCase())));
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
//       })
//       .finally(() => {
//         setPreloaderStatus(false);
//       });
//   } else {
//     if (checkedStatus) {
//       setMoviesForRender(movies.filter(mov => mov.duration <= 40 && (mov.nameRU.toLowerCase().includes(movieName.toLowerCase()) || mov.nameEN.toLowerCase().includes(movieName.toLowerCase()))));
//     } else {
//       setMoviesForRender(movies.filter(mov => mov.nameRU.toLowerCase().includes(movieTitle.toLowerCase()) || mov.nameEN.toLowerCase().includes(movieName.toLowerCase())));
//     }
//   }
// }

// // Переключатель короткометражек
// const handleChecked = () => {
//   setCheckedStatus(!checkedStatus);
//   // localStorage.setItem('savedCheckedStatus', checkedStatus);
// }

// React.useEffect(() => {
//   localStorage.setItem('savedCheckedStatus', checkedStatus);
// }, [checkedStatus])

// React.useEffect(() => {
//   if (movies.length === 0) {
//     localStorage.removeItem('savedMovies');
//   } else {
//     localStorage.setItem('savedMoviesList', JSON.stringify(movies));
//   }
// }, [movies]);

// React.useEffect(() => {
//   const localFilms = JSON.parse(localStorage.getItem('savedMoviesList'));
//   if (localFilms) {
//     setMoviesForRender(localFilms);
//   }
//   setMovieTitle(JSON.parse(localStorage.getItem('savedMovieTitle')));
//   setCheckedStatus(JSON.parse(localStorage.getItem('savedCheckedStatus')));
// }, [])