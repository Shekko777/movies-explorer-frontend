import React from 'react';
import { Link } from 'react-router-dom';
import loginLogo from '../../images/login/login-logo.svg';
import './Login.css';

const Login = () => {
  // Константы
  const [data, setData] = React.useState({
    email: "",
    password: "",
  })
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = React.useState(false);
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // Функции
  const handleChange = (evt) => {
    if (evt.target.name === "email") {
      if (!re.test(String(evt.target.value).toLocaleLowerCase())) {
        setError({
          ...error,
          email: "Неккоректный email",
        });
      } else {
        setError({
          ...error,
          email: "",
        })
      }
    } else {
      setError({
        ...error,
        [evt.target.name]: evt.target.validationMessage,
      });
    };
    setData({
      ...data,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log([data.email, data.password])
  }

  // useEffect
  React.useEffect(() => {
    setIsDisabled(data.email.length <= 1 || data.password.length <= 1 || error.email || error.password);
  }, [data.email, data.password, error.email, error.password])

  // Вёрстка
  return (
    <div className="login">
      <div className="login__container">
        <Link className="login__link" to="/">
          <img className="login__logo" src={loginLogo} alt="Логотип сайта" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

        <form onSubmit={handleSubmit} className="login__form" action="#">
          <fieldset className="login__form-fieldset">
            <label className="login__form-label">
              E-mail
              <input className={error.email ? "login__form-input login__form-input_color_red" : "login__form-input"} onChange={handleChange} value={data.email} type="email" name="email" required autoComplete="off" />
              <span className="login__form-error" id="email-error">{error.email}</span>
            </label>

            <label className="login__form-label">
              Пароль
              <input className={error.password ? "login__form-input login__form-input_type_password login__form-input_color_red" : "login__form-input login__form-input_type_password"} onChange={handleChange} value={data.password} type="password" name="password" required autoComplete="off" minLength={3} />
              <span className="login__form-error" id="password-error">{error.password}</span>
            </label>
          </fieldset>

          <div className="login__form-bottom">
            <button className={isDisabled ? "login__form-button login__form-button_type_disabled" : "login__form-button"} type="submit" disabled={isDisabled}>Войти</button>
            <p className="login__bottom-text">Еще не зарегистрированны? <Link className="login__bottom-link" to="/register">Регистрация</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;