import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import './Movies.css';
import films from '../../utils/dataFilms';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedIcon from "../../images/movies/saved.svg";
import { useResize } from "../../hooks/useResize";

const Movies = () => {
  const windowSize = useResize();

  const [quantityCards, setQuantityCards] = React.useState(windowSize.quantity);
  const itemsToRender = films.slice(0, quantityCards);


  const showMore = () => {
    if(quantityCards > films.length) {
      console.log('Максималочка, покупай подписку PREMIUM');
      return;
    } else {
      setQuantityCards(quantityCards + windowSize.term);
    }
  }

  const clickMan = () => {

  }

  return (
    <section className="movies">
      <Header login={true} />
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList>
          {itemsToRender.map((film, index) => {
            return (
              <MoviesCard film={film} clickMan={clickMan} key={index} name={film.name} time={film.time} image={film.image}>
                {/* {film.saved ? (
                  <button className="movies__card-button movies__card-button_type_saved" type="button"><img className="movies__card-icon" src={savedIcon} alt="Фильм сохранён" /></button>
                ) : (
                  <button className="movies__card-button" type="button">Сохранить</button>
                )} */}
              </MoviesCard>
            )
          })}
        </MoviesCardList>
        <button className={quantityCards > films.length ? "movies__button movies__button_type_disabled" : "movies__button"} disabled={quantityCards > films.length} onClick={showMore}>Ещё</button>
      </div>
      <Footer />
    </section>
  )
}

export default Movies;