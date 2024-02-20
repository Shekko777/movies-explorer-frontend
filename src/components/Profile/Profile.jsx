import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = React.useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });
  const [errorEmail, setErrorEmail] = React.useState(false)

  const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const handleChange = (evt) => {
    if (evt.target.name === "email") {
      !emailRegex.test(String(evt.target.value).toLocaleLowerCase()) ? setErrorEmail(true) : setErrorEmail(false);
    }
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(userData);
  }


  return (
    <main className="profile main">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" onSubmit={handleSubmit} action="#">
          <fieldset className="profile__form-fieldset">
            <label className="profile__form-label">
              Имя
              <input className="profile__form-input" type="text" name="name" autoComplete="off" required value={userData.name} onChange={handleChange} placeholder="Имя" minLength={2} maxLength={30} />
            </label>

            <label className="profile__form-label">
              E-mail
              <input className={errorEmail ? "profile__form-input profile__form-input_type_error" : "profile__form-input"} type="text" name="email" autoComplete="off" required value={userData.email} onChange={handleChange} placeholder="E-mail" />
            </label>
          </fieldset>

          <div className="profile__form-bottom">
            <button className="profile__form-button" type="submit" disabled={errorEmail}>Редактировать</button>
            <Link className="profile__form-exit" to="/signin">Выйти из аккаунта</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile;