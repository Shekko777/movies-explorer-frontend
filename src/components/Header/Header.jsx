import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/header/logo.svg';
import accountIcon from '../../images/header/account-icon.svg';
import './Header.css';

const Header = ({ login, themeLight }) => {

  const [burgerMenuStatus, setBurgerMenuStatus] = React.useState(false);

  const buttonClick = () => {
    setBurgerMenuStatus(!burgerMenuStatus);
  }

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </Link>
      {login ? (
        <div className="header-registered">
          <button className={burgerMenuStatus ? "header-registered__burger header-registered__burger_active" : "header-registered__burger"} onClick={buttonClick}></button>
          <nav className={burgerMenuStatus ? "header-nav header-nav_active" : "header-nav"}>
            <ul className="header-nav__list">
              <li className="header-nav__item">
                <NavLink className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/">Главная</NavLink>
              </li>
              <li className="header-nav__item">
                <NavLink className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/account">Фильмы</NavLink>
              </li>
              <li className="header-nav__item">
                <NavLink className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/saved-films">Сохранённые фильмы</NavLink>
              </li>
            </ul>
            <Link className="header-nav__link-account" to="/account">Аккаунт <img className={themeLight ? "header__button-img header__button-img_theme_light" : "header__button-img"} src={accountIcon} alt="Кнопка аккаунт" /></Link>
          </nav>
        </div>
      ) : (
        <div className="header-notregistered">
          <a className="header__button-register" href="/register">Регистрация</a>
          <a className="header__button-login" href="/login">Войти</a>
        </div>
      )}
    </header>
  )
}

export default Header;