import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [invalidSignup, invalidateSignup] = React.useState(false);
  const [handleSignup] = React.useState(false);

  const signupAuthentication = async () => {//we need to actually implement this later
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
        invalidateSignup(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="left-side-bar">
        <h2>Welcome!</h2>
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
          {invalidSignup && <p1 className="error-message">Error: Email or Password is invalid.</p1>}
          <button onClick = {signupAuthentication} type="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
