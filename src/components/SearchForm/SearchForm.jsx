import React from "react";
import './SearchForm.css';

const SearchForm = ({ onSubmit, checkedStatus, onChecked, movieTitle, setMovieTitle, saved }) => {
  const [focusInput, setFocusInput] = React.useState(false);
  const [errorPlaceholder, setErrorPlaceholder] = React.useState(false)

  const handleChange = (evt) => {
    if (evt.target.name === "name") {
      setMovieTitle(evt.target.value)
    } 
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    if (!movieTitle) {
      setErrorPlaceholder(true);
    } else {
      setErrorPlaceholder(false);
      onSubmit(movieTitle.toLowerCase());
    }
  }
  
  const handleChecked = () => {
    onChecked();
  }

  React.useEffect(() => {
    if (movieTitle.length === 0 && !saved) {
      if (JSON.parse(localStorage.getItem('saveMovieTitle'))) {
        setErrorPlaceholder(true);
      } else {
        setErrorPlaceholder(false);
      }
    } else {
      onSubmit(movieTitle.toLowerCase());
    }
  }, [checkedStatus]);

  return (
    <form noValidate className="search-form" onSubmit={handleSubmit}>
      <fieldset className={focusInput ? "search-form__fieldset search-form__fieldset_focus" : "search-form__fieldset"}>
        <input className={errorPlaceholder ? "search-form__input search-form__input_type_error" : "search-form__input"} onChange={handleChange} onFocus={() => setFocusInput(!focusInput)} onBlur={() => setFocusInput(!focusInput)} value={movieTitle} placeholder={errorPlaceholder ? "Нужно ввести ключевое слово" : "Фильм"} autoComplete="off" required name="name" type="text" />
        <button className="search-form__button" type="submit">Поиск</button>
      </fieldset>

      <label className="search-form__checkbox-wrapper">
        <input className="search-form__checkbox" onChange={handleChecked} checked={checkedStatus} id="checkbox" type="checkbox" name="checkbox" />
        <span className="search-form__checkbox-span"></span>
        Короткометражки
      </label>
    </form>
  )
}

export default SearchForm;