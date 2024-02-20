import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';
import films from "../../utils/constants";


const SavedMovies = () => {
  return (
    <main className="saved-movies main">
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList movies={true}>
          {films.map((film, index) => {
            if(film.saved) {
              return (
                <MoviesCard key={index} film={film} savedFilm={true} />
              )  
            }
          })}
        </MoviesCardList>
      </div>
    </main>
  )
}

export default SavedMovies;