import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';

import Register from '../Register/Register';

const App = () => {
  const [login, setLogin] = React.useState(false);

  return (
    <Routes>
      <Route path='/' element={<Main login={login} />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
