import React from "react";
import './SearchForm.css';

const SearchForm = () => {
  const [filmName, setFilmName] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true)
  const [focusInput, setFocusInput] = React.useState(false)

  const handleChange = (evt) => {
    if(evt.target.name === "name") {
      setFilmName(evt.target.value)
    } else {
      setIsChecked(!isChecked);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(filmName);
  }

  return (
    <form noValidate className="search-form" onSubmit={handleSubmit}>
      <fieldset className={focusInput ? "search-form__fieldset search-form__fieldset_focus" : "search-form__fieldset"}>
        <input className="search-form__input" onChange={handleChange} onFocus={() => setFocusInput(!focusInput)} onBlur={() => setFocusInput(!focusInput)} value={filmName} placeholder="Фильм" autoComplete="off" required name="name" type="text" />
        <button className="search-form__button" type="submit">Поиск</button>
      </fieldset>

      <label className="search-form__checkbox-wrapper">
        <input className="search-form__checkbox" onChange={handleChange} checked={isChecked} id="checkbox" type="checkbox" name="checkbox" />
        <span className="search-form__checkbox-span"></span>
        Короткометражки
      </label>
    </form>
  )
}

export default SearchForm;