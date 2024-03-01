import React from 'react';
import './App.css'; // Import the CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="left-side-bar">
        <div className="login-form-container">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
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
      <div className="right-side-bar">
        <h2>Crystal Chrono</h2>
      </div>
    </div>
  );
};

export default LoginPage;
