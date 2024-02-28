import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoSvg from '../../images/logo.svg';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  // Константы
  const [data, setData] = React.useState({
    email: "",
    password: "",
  })
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);
  const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // Функции
  const handleChange = (evt) => {
    if (evt.target.name === "email") {
      if (!emailRegex.test(String(evt.target.value).toLocaleLowerCase())) {
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
    onLogin(data.email, data.password)
      .then(() => {
        navigate('/movies')
      })
      .catch(err => {
        setErrorMessage(`Произошла ошибка ${err}. Повторите попытку немного позже.`)
      })
  }

  // useEffect
  React.useEffect(() => {
    setIsDisabled(data.email.length <= 1 || data.password.length <= 1 || error.email || error.password);
  }, [data.email, data.password, error.email, error.password])

  // Вёрстка
  return (
    <main className="login main">
      <div className="login__container">
        <Link className="login__link" to="/">
          <img className="login__logo" src={logoSvg} alt="Логотип сайта" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

        <form onSubmit={handleSubmit} className="login__form" action="#">
          <fieldset className="login__form-fieldset">
            <label className="login__form-label">
              E-mail
              <input className={error.email ? "login__form-input login__form-input_color_red" : "login__form-input"} onChange={handleChange} value={data.email} placeholder='E-mail' type="email" name="email" required autoComplete="off" />
              <span className="login__form-error" id="email-error">{error.email}</span>
            </label>

            <label className="login__form-label">
              Пароль
              <input className={error.password ? "login__form-input login__form-input_type_password login__form-input_color_red" : "login__form-input login__form-input_type_password"} onChange={handleChange} value={data.password} placeholder='Пароль' type="password" name="password" required autoComplete="off" minLength={2} maxLength={30} />
              <span className="login__form-error" id="password-error">{error.password}</span>
            </label>
          </fieldset>

          <div className="login__form-bottom">
            <p className="login__error-message">{errorMessage}</p>
            <button className={isDisabled ? "login__form-button login__form-button_type_disabled" : "login__form-button"} type="submit" disabled={isDisabled}>Войти</button>
            <p className="login__bottom-text">Еще не зарегистрированны? <Link className="login__bottom-link" to="/signup">Регистрация</Link></p>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login;