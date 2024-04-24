import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './auth/Login';
import SignupPage from './auth/Signup';
import HomePage from './home/HomePage';
import Board from './leaderboard/Leaderboard';
import VerifyPage from './auth/verify';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/verify' element={<VerifyPage />} />
        <Route path='/leaderboard' element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
