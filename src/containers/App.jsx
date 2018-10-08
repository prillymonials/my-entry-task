import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOCAL_STORAGE_KEY } from '../constants';
import Login from './Login';
import MainLayout from './MainLayout';
import { loginSuccess } from '../actions/auth';
import '../styles/App.scss';

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { login } = this.props;
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (user) {
      login(JSON.parse(user));
    }
  }

  render() {
    const { isLoggedIn, isSidebarOpen } = this.props;

    const openClassName = isSidebarOpen ? 'open' : '';

    return (
      <div className={`app-container ${openClassName}`}>
        {!isLoggedIn ? <Login /> : <MainLayout />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isSidebarOpen: state.route.isSidebarOpen,
});

export default connect(
  mapStateToProps,
  { login: loginSuccess },
)(App);
