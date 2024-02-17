import React from "react";
import { useResize } from "../../hooks/useResize";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';
import films from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
  const windowSize = useResize();
  const [quantityCards, setQuantityCards] = React.useState(windowSize.quantity);
  const itemsToRender = films.slice(0, quantityCards);
  // const itemsToRender = false;

  // Кнопка Ещё
  const handleButtonShowMore = () => {
    if(quantityCards > films.length) {
      return;
    } else {
      setQuantityCards(quantityCards + windowSize.term);
    }
  }

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList movies={itemsToRender}>
          {itemsToRender ? itemsToRender.map((film, index) => ( <MoviesCard key={index} film={film} /> )) : <Preloader />}
        </MoviesCardList>
        {itemsToRender && <button onClick={handleButtonShowMore} className={quantityCards > films.length ? "movies__button movies__button_type_disabled" : "movies__button"} disabled={quantityCards > films.length}>Ещё</button>}
      </div>
    </section>
  )
}

export default Movies;