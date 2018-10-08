import React from 'react';
import PropTypes from 'prop-types';
import User from '../assets/svg/user.svg';
import Password from '../assets/svg/password.svg';
import '../styles/LoginForm.scss';

const LoginForm = ({ setEmailRef, setPasswordRef, handleLogin }) => (
  <div className="app-login-form">
    <div className="app-login-form-input-container">
      <User className="app-login-form-input-icon" />
      <input
        type="text"
        ref={setEmailRef}
        name="email"
        className="app-login-form-input"
        placeholder="Email"
      />
    </div>
    <div className="app-login-form-input-container">
      <Password className="app-login-form-input-icon" />
      <input
        type="password"
        ref={setPasswordRef}
        name="email"
        className="app-login-form-input"
        placeholder="Password"
      />
    </div>
    <button type="button" onClick={handleLogin} className="app-login-form-login-btn">
      SIGN IN
    </button>
  </div>
);

LoginForm.propTypes = {
  setEmailRef: PropTypes.func.isRequired,
  setPasswordRef: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
