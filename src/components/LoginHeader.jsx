import React from 'react';
import Logo from '../assets/svg/logo-cat.svg';
import '../styles/LoginHeader.scss';

const LoginHeader = () => (
  <div className="app-login-header">
    <h3 className="app-login-header-subtitle">FIND THE MOST LOVED ACTIVITIES</h3>
    <h2 className="app-login-header-title">BLACK CAT</h2>
    <div className="app-login-header-outer-circle">
      <div className="app-login-header-inner-circle">
        <Logo />
      </div>
    </div>
  </div>
);

export default LoginHeader;
