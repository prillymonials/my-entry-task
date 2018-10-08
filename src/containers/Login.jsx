import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from './Toast';
import { doLogin } from '../actions/auth';
import { handleToast } from '../actions/toast';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import '../styles/Login.scss';

class Login extends Component {
  static propTypes = {
    loginError: PropTypes.string,
    login: PropTypes.func.isRequired,
    triggerToast: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loginError: null,
  };

  setEmailRef = (ref) => {
    this.emailRef = ref;
  };

  setPasswordRef = (ref) => {
    this.passwordRef = ref;
  };

  handleLogin = () => {
    const { login, triggerToast } = this.props;

    login(
      {
        email: this.emailRef.value,
        password: this.passwordRef.value,
      },
      triggerToast,
    );
  };

  render() {
    const { loginError } = this.props;

    return (
      <div className="app-login">
        <div className="app-login-bg-color">
          <Toast>{loginError}</Toast>
          <LoginHeader />
          <LoginForm
            handleLogin={this.handleLogin}
            setEmailRef={this.setEmailRef}
            setPasswordRef={this.setPasswordRef}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
});

const mapDispatchToProps = {
  login: doLogin,
  triggerToast: handleToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
