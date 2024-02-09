import React from 'react';
import { Link } from 'react-router-dom';
import registerLogo from '../../images/register/register-logo.svg';
import './Register.css';

const Register = () => {
  // Константы
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = React.useState(true);
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
    console.log([data.name, data.email, data.password])
  }

  // useEffect
  React.useEffect(() => {
    setIsDisabled(data.name.length <= 1 || data.email.length <= 1 || data.password.length <= 1 || error.name || error.email || error.password);
  }, [data.name, data.email, data.password, error.name, error.email, error.password])

  // Вёрстка
  return (
    <div className="register">
      <div className="register__container">
        <Link className="register__link" to="/">
          <img className="register__logo" src={registerLogo} alt="Логотип сайта" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

        <form onSubmit={handleSubmit} className="register__form" action="#">
          <fieldset className="register__form-fieldset">
            <label className="register__form-label">
              Имя
              <input className={error.name ? "register__form-input register__form-input_color_red" : "register__form-input"} onChange={handleChange} value={data.name} type="text" name="name" required autoComplete="off" minLength={3} maxLength={20} />
              <span className="register__form-error" id="name-error">{error.name}</span>
            </label>
            <label className="register__form-label">
              E-mail
              <input className={error.email ? "register__form-input register__form-input_color_red" : "register__form-input"} onChange={handleChange} value={data.email} type="email" name="email" required autoComplete="off" />
              <span className="register__form-error" id="email-error">{error.email}</span>
            </label>

            <label className="register__form-label">
              Пароль
              <input className={error.password ? "register__form-input register__form-input_type_password register__form-input_color_red" : "register__form-input register__form-input_type_password"} onChange={handleChange} value={data.password} type="password" name="password" required autoComplete="off" minLength={3} />
              <span className="register__form-error" id="password-error">{error.password}</span>
            </label>
          </fieldset>

          <div className="register__form-bottom">
            <button className={isDisabled ? "register__form-button register__form-button_type_disabled" : "register__form-button"} type="submit" disabled={isDisabled}>Зарегистрироваться</button>
            <p className="register__bottom-text">Уже зарегистрированны? <Link className="register__bottom-link" to="/login">Войти</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;