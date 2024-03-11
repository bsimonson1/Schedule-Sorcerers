import React from 'react';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidLogin, invalidateLogin] = React.useState(false);

  const handleLogin = (e) => {//we need to actually implement this later
    e.preventDefault(); // stops the page from refreshing

    //implement actual authentication here
    if (email && password){
      navigate("./home");
    } else {
      invalidateLogin(true);
    }
  }

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
        <form onSubmit = {handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {invalidLogin && <p1 className="error-message">Error: Email or Password is incorrect.</p1>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
