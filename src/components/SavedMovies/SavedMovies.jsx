import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';

const SavedMovies = ({ savedMovies, handleRemoveMovie }) => {
  const [checked, setChecked] = React.useState(false);
  const [movieTitle, setMovieTitle] = React.useState('');
  const [renderMovies, setRenderMovies] = React.useState([]);

  // Отправка формы
  const handleSubmit = (movieName) => {
    if (checked) {
      setRenderMovies(savedMovies.filter(m => m.duration <= 40 && (m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName))));  
    } else {
      setRenderMovies(savedMovies.filter(m => m.nameRU.toLowerCase().includes(movieName) || m.nameEN.toLowerCase().includes(movieName)));
    }
  }

  // Проверить чекед
  const handleChecked = () => {
    setChecked(!checked);
  }

  React.useEffect(() => {
    if (checked) {
      setRenderMovies(savedMovies.filter(m => m.duration <= 40 && (m.nameRU.toLowerCase().includes(movieTitle) || m.nameEN.toLowerCase().includes(movieTitle))));  
    } else {
      setRenderMovies(savedMovies.filter(m => m.nameRU.toLowerCase().includes(movieTitle) || m.nameEN.toLowerCase().includes(movieTitle)));
    }
  }, [savedMovies])

  return (
    <main className="saved-movies main">
      <div className="saved-movies__container">
        <SearchForm handleSubmit={handleSubmit} movies={savedMovies} savedSearch={true} checkedStatus={checked} handleChecked={handleChecked} movieTitle={movieTitle} setMovieTitle={setMovieTitle} saved={true} />
        <MoviesCardList movies={true}>
          {renderMovies?.map((movie, index) => {
            return (
              <MoviesCard key={index} movie={movie} handleRemoveMovie={handleRemoveMovie} savePage={true} savedMovies={savedMovies}  />
            )  
          })}
        </MoviesCardList>
      </div>
    </main>
  )
}

export default SavedMovies;