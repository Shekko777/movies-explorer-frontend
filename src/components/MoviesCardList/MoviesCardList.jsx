import './MoviesCardList.css';
const MoviesCardList = ({ movies, children }) => {
  return (
    <ul className={movies ? "movies__list" : "movies__list movies__list_empty"} >
      {children}
    </ul>
  )
}

export default MoviesCardList;