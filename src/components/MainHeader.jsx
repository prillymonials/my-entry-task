import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '../assets/svg/home.svg';
import SearchIcon from '../assets/svg/search.svg';
import LogoIcon from '../assets/svg/logo-cat.svg';
import UserMenuHeader from './UserMenuHeader';
import '../styles/MainHeader.scss';

const MainHeader = ({
  route,
  userAvatarUrl,
  handleLogout,
  handleToggleSidebar,
  handleGoToHome,
  handleGoToMe,
}) => (
  <div className="app-main-header">
    {route === 'home' ? (
      <SearchIcon className="app-left-icon" onClick={handleToggleSidebar} />
    ) : (
      <HomeIcon className="app-left-icon" onClick={handleGoToHome} />
    )}
    <LogoIcon className="app-logo" />
    <UserMenuHeader
      avatarUrl={userAvatarUrl}
      handleLogout={handleLogout}
      handleGoToMe={handleGoToMe}
    />
  </div>
);

MainHeader.propTypes = {
  route: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
  handleGoToHome: PropTypes.func.isRequired,
  handleGoToMe: PropTypes.func.isRequired,
};

export default MainHeader;
