import './MoviesCardList.css';
const MoviesCardList = ({ children }) => {
  return (
    <ul className="movies__list">
      {children}
    </ul>
  )
}

export default MoviesCardList;