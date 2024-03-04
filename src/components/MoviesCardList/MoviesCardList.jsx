import './MoviesCardList.css';
const MoviesCardList = ({ movies, searchMessage, children }) => {

  if (movies.length === 0 && JSON.parse(localStorage.getItem('saveMovieTitle'))) {
    return (
      <p className="movies__message">{searchMessage || 'Ничего не найдено.'}</p>
    )
  } else {
    return (
      <ul className={movies ? "movies__list" : "movies__list movies__list_empty"} >
          {children}
    </ul>
    )
  }
}

export default MoviesCardList;