import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import './Leaderboard.css'
import { useNavigate } from 'react-router-dom';

export default function Board() {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/home');
  };

  const handleClick = (e) =>
   {
     //We can have different sorting parameters or whatever we want here
  }

  return (
    <div className="board">
      <button onClick={goBack}>Back To Home Page</button>
      <div className='leaderboard'>
        <h1>Leaderboard</h1>

        <div className="duration">
        </div>

        <Profiles Leaderboard={sortScores(Leaderboard)}></Profiles>
      </div>
    </div>
  )
}



function sortScores(data) {
    return data.sort((a, b) => b.score - a.score);
}
