import React from 'react';
import './App.css'; // Import the CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-page-container">
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
  );
};

export default LoginPage;
