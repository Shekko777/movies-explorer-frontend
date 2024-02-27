import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div className='app'>
      <Header login={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute component={Profile} loggedIn={loggedIn}  />} />
        <Route path='/movies' element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
        <Route path='/saved-movies' element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn}  />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
