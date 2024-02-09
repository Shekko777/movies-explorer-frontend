import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = React.useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });

  const handleChange = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = () => {
    console.log('редактировать профиль')
  }

  return (
    <>
      <section className="profile">
        <Header login={true} />
        <div className="profile__container">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" onSubmit={handleSubmit} action="#">
            <fieldset className="profile__form-fieldset">
              <label className="profile__form-label">
                Имя
                <input className="profile__form-input" type="text" name="name" autoComplete="off" required value={userData.name} onChange={handleChange} placeholder={userData.name} />
              </label>

              <label className="profile__form-label">
                E-mail
                <input className="profile__form-input" type="text" name="email" autoComplete="off" required value={userData.email} onChange={handleChange} placeholder={userData.email} />
              </label>
            </fieldset>

            <div className="profile__form-bottom">
              <button className="profile__form-button" type="submit">Редактировать</button>
              <Link className="profile__form-exit" to="/">Выйти из аккаунта</Link>
            </div>
          </form>
        </div>
      </section>
    </>

  )
}

export default Profile;