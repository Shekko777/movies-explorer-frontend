// Библиотеки/Константы:
import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import moviesApiURL from '../../utils/constants';
// Компоненты:
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// Запросы к API:
import auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from '../../utils/MoviesApi';

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') || false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  })
  const [savedMovies, setSavedMovies] = React.useState([]);

  // РЕГИСТРАЦИЯ
  const handleSubmitRegister = (name, email, password) => {
    return auth.signUp(name, email, password)
      .then((user) => {
        setCurrentUser({
          name: name,
          email: email,
        });
        handleSubmitLogin(user.email, password);
      })
      .catch(err => console.log(`При регистрации произошла ошибка ${err}`));
  }

  // ЛОГИН
  const handleSubmitLogin = (email, password) => {
    return auth.signIn(email, password)
      .then(res => {
        localStorage.setItem('token', res.jwt);
        setLoggedIn(true);
        handleCheckedToken(); 
        navigate('/movies', {replace: true});
      })
      .catch(err => console.log(`При авторизации произошла ошибка ${err}`))
  }

  // Функция выхода из профиля 
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch(err => console.log(`Не удалось выйти, ошибка: ${err}`));
  }

  // Получить все фильмы
  const getMovies = () => {
    return moviesApi.getMovies()
      .catch(err => console.log(`При получении всех фильмов произошла ошибка ${err}`));
  }

  // Получить сохранённые фильмы
  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => console.log(`Ошибка при получении сохранённых фильмов: ${err}`))
  }

  // Сохранить фильм
  const handleSavedMovie = (movie) => {
    mainApi.saveMovies(
      movie.country,
      movie.director,
      movie.duration,
      movie.year,
      movie.description,
      moviesApiURL + movie.image.url,
      movie.trailerLink,
      moviesApiURL + movie.image.formats.thumbnail.url,
      movie.id,
      movie.nameRU,
      movie.nameEN,
    ).then(resSavedMovie => {
      setSavedMovies([...savedMovies, resSavedMovie.movie]);
    })
      .catch(err => console.log(`Не удалось сохранить фильм, ошибка: ${err}`));
  }

  // Удалить фильм
  const handleRemoveMovie = (movie) => {
    return mainApi.removeMovies(movie._id)
      .then(resDeletedMovie => {
        setSavedMovies(savedMovies.filter(m => m.movieId !== resDeletedMovie.movieId));
      })
      .catch(err => console.log(`Не удалось удалить фильм, ошибка: ${err}`));
  }

  // Обновление информации о пользователе
  const handleChangeUserInfo = (name, email) => {
    return mainApi.changeInfo(name, email)
      .then(dataUser => {
        setCurrentUser({
          name: dataUser.name,
          email: dataUser.email,
        });
      })
      .catch(err => console.log(`При обновлении информации произошла ошибка ${err}`))
  }

  // Функция проверки зарегистрированного пользователя
  const handleCheckedToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken()
      .then(res => {
          setLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
          })
          getSavedMovies();
        })
        .catch(err => console.log(`Вы не зарегистрированны: ${err}`))
    }
  }

  // Проверка авторизованности при заходе на сайт
  React.useEffect(() => {
    handleCheckedToken();
  }, []);

  return (
    <div className='app'>
      <Header login={loggedIn} />
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={loggedIn ? <Navigate to="/movies" replace /> : <Login onLogin={handleSubmitLogin} />} />
          <Route path='/signup' element={loggedIn ? <Navigate to="/movies" replace /> : <Register onRegister={handleSubmitRegister} />} />
          <Route path='/profile' element={<ProtectedRoute loggedIn={loggedIn} component={Profile} onOut={handleSignOut} currentUser={currentUser} onChangeUserInfo={handleChangeUserInfo} />} />
          <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} onSavedMovie={handleSavedMovie} onRemoveMovie={handleRemoveMovie} savedMovies={savedMovies} onGetMovies={getMovies} onSetSavedMovies={setSavedMovies} />} />
          <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies} onRemoveMovie={handleRemoveMovie} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  )
}

export default App;
