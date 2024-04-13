import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './auth/Login';
import SignupPage from './auth/Signup';
import HomePage from './home/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={LoginPage} />
        <Route exact path='/signup' Component={SignupPage} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
