import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './auth/Login';
import SignupPage from './auth/Signup';
import HomePage from './home/HomePage';
import Board from './leaderboard/Leaderboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={LoginPage} />
        <Route exact path='/signup' Component={SignupPage} />
        <Route path='/home' element={<HomePage />} />
        <Route exact path='/leaderboard' Component={Board} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
