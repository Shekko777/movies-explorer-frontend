import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';
import films from '../../utils/dataFilms';
import deleteIcon from '../../images/movies/delete-button.svg';

const SavedMovies = () => {
  

  return (
    <section className="saved-movies">
      <Header login={true}/>
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList>
          {films.map((film, index) => {
            return (
              <MoviesCard key={index} name={film.name} time={film.time} image={film.image}>
                <button className="movies__card-button"><img className="movies__card-icon" src={deleteIcon} alt="Кнопка удалить фильм" /></button>
              </MoviesCard>
            )
          })}
        </MoviesCardList>
      </div>
      <Footer />
    </section>
  )
}

export default SavedMovies;