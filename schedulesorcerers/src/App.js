import React from 'react';
import './App.css'; // Import the CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="right-side-bar">
        <h2>Crystal Chrono</h2>
        <div className="small-line-white"/>
        <p1>Don't have an account? Sign up today!</p1>
        <button>Sign Up</button>
      </div>

      <div className="left-side-bar">
        <h2>Welcome Back!</h2>
        <div className="small-line-purple"/>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
