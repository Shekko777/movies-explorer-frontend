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
    <main className="movies main">
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList movies={itemsToRender}>
          {itemsToRender ? itemsToRender.map((film, index) => ( <MoviesCard key={index} film={film} /> )) : <Preloader />}
        </MoviesCardList>
        {itemsToRender && <button onClick={handleButtonShowMore} type="button" className={quantityCards > films.length ? "movies__more movies__more_type_disabled" : "movies__more"} disabled={quantityCards > films.length}>Ещё</button>}
      </div>
    </main>
  )
}

export default Movies;