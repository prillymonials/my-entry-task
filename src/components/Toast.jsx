import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Toast.scss';

const Toast = ({ show, isPost, children }) => {
  const showClassName = show ? 'show' : '';
  const postClassName = isPost ? 'post' : '';

  return (
    <div className={`app-toast ${postClassName} ${showClassName}`}>
      <span>{children}</span>
    </div>
  );
};

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  isPost: PropTypes.bool,
  children: PropTypes.node,
};

Toast.defaultProps = {
  children: null,
  isPost: false,
};

export default Toast;
