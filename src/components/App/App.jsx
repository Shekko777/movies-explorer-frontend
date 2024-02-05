import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';

const App = () => {
  const [login, setLogin] = React.useState(true);

  return (
    <Routes>
      <Route path='/' element={<Main login={login} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
