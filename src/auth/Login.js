import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [invalidLogin, invalidateLogin] = React.useState(false);
  const [handleLogin] = React.useState(false);

  const loginAuthentication = async () => {//we need to actually implement this later
    {
      //  navigate('/home');
      try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        navigate('/home');
      } else {
        setError(data.error);
        invalidateLogin(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
   }
  };

  return (
    <div className="login-page-container">
      <div className="right-side-bar">
        <h2>Crystal Chrono</h2>
        <div className="small-line-white"/>
        <p>Don't have an account? Sign up today!</p>
        <button onClick={() => {
            navigate("/signup");
          }}> Sign Up</button>
      </div>

      <div className="left-side-bar">
        <h2>Welcome Back!</h2>
        <div className="small-line-purple"/>
        <form onSubmit = {handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {invalidLogin && <p1 className="error-message">Error: Email or Password is incorrect.</p1>}
          <button onClick = {loginAuthentication} type="button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
