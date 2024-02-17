import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoSvg from '../../images/logo.svg';
import accountIcon from '../../images/header/account-icon.svg';
import './Header.css';

const Header = ({ login }) => {
  const location = useLocation();
  const headerLocation = ['/', '/movies', '/saved-movies', '/profile']
  const [burgerMenuStatus, setBurgerMenuStatus] = React.useState(false);

  const handleBurgerClick = () => {
    setBurgerMenuStatus(!burgerMenuStatus);
  }

  const handleClickNavLink = () => {
    setBurgerMenuStatus(!burgerMenuStatus);
  }
  
  if (headerLocation.includes(location.pathname)) {
    return (
      <header className={location.pathname === '/' ? "header header_type_main" : "header"}>
        <div className="header__container">
          <Link className="header__link" to="/">
            <img className="header__logo" src={logoSvg} alt="Логотип сайта" />
          </Link>
          {login ? (
            <div className="header-registered">
              <button className={burgerMenuStatus ? "header-registered__burger header-registered__burger_active" : "header-registered__burger"} onClick={handleBurgerClick}></button>
              <nav className={burgerMenuStatus ? "header-nav header-nav_active" : "header-nav"}>
                <ul className="header-nav__list">
                  <li className="header-nav__item">
                    <NavLink onClick={handleClickNavLink} className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/">Главная</NavLink>
                  </li>
                  <li className="header-nav__item">
                    <NavLink onClick={handleClickNavLink} className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/movies">Фильмы</NavLink>
                  </li>
                  <li className="header-nav__item">
                    <NavLink onClick={handleClickNavLink} className={({ isActive }) => `header-nav__link ${isActive ? "header-nav__link_active" : ""}`} to="/saved-movies">Сохранённые фильмы</NavLink>
                  </li>
                </ul>
                <Link onClick={handleClickNavLink} className="header-nav__link-account" to="/profile">Аккаунт <img className={location.pathname === '/' ? "header__button-img header__button-img_theme_light" : "header__button-img"} src={accountIcon} alt="Кнопка аккаунт" /></Link>
              </nav>
            </div>
          ) : (
            <div className="header-notregistered">
              <a className="header__button-register" href="/signup">Регистрация</a>
              <a className="header__button-login" href="/signin">Войти</a>
            </div>
          )}
        </div>
      </header>
    )
  }
  
}

export default Header;