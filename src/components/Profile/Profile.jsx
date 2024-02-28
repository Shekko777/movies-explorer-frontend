import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Profile = ({ onOut, onChangeUserInfo }) => {
  const currentUserInfo = React.useContext(CurrentUserContext);
  // Новые данные из инпутов:
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
  });
  // Старые данные для сравнения:
  const [oldUserData, setOldUserData] = React.useState({
    name: '',
    email: '',
  });

  const [buttonStatus, setButtonStatus] = React.useState(false); // Активность кнопки при проверке
  const [errorEmail, setErrorEmail] = React.useState(false); // Состояние email при ошибке
  const [messageForUser, setMessageForUser] = React.useState(''); // Сообщение после редактирования профиля;
  const [successfull, setSuccessfull] = React.useState(true); // Цвет сообщения при ошибке или успехе

  // Регулярка для проверки E-mail:
  const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // Изменение инпутов
  const handleChange = (evt) => {
    if (evt.target.name === "email") {
      setErrorEmail(!emailRegex.test(String(evt.target.value).toLocaleLowerCase()));
    }
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    })
  }

  // Отправка изменений
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonStatus(true);
    onChangeUserInfo(userData.name, userData.email)
      .then(_ => {
        setMessageForUser('Данные изменены');
        setSuccessfull(true);
      }) 
      .catch(err => {
        setMessageForUser(`Произошла ошибка при изменении данных ${err}`)
        setSuccessfull(false);
      })
      .finally(() => {
        setButtonStatus(false);
      });
  }

  // Монтирование при загрузки страницы
  React.useEffect(() => {
    if ((oldUserData.name === userData.name && oldUserData.email === userData.email) || errorEmail) {
      setButtonStatus(true)
    } else {
      setMessageForUser('');
      setButtonStatus(false)
    }
  }, [userData, oldUserData, errorEmail])
  
  React.useEffect(() => {
    setUserData({
      name: currentUserInfo.name,
      email: currentUserInfo.email,
    })

    setOldUserData({
      name: currentUserInfo.name,
      email: currentUserInfo.email,
    })
  }, [currentUserInfo])

  return (
    <main className="profile main">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${oldUserData.name}!`}</h1>
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
            <p className={successfull ? "profile__message profile__message_color_green" : "profile__message profile__message_color_red"}>{messageForUser}</p>
            <button className={buttonStatus ? "profile__form-button profile__form-button_disabled" :"profile__form-button"} type="submit" disabled={buttonStatus}>Редактировать</button>
            <Link onClick={onOut} className="profile__form-exit" to="/">Выйти из аккаунта</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Profile;