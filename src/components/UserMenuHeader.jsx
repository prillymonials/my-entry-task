import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import '../styles/UserMenuHeader.scss';

const CustomTitle = ({ avatarUrl }) => <img src={avatarUrl} alt="user" />;
CustomTitle.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

const UserMenuHeader = ({ avatarUrl, handleLogout, handleGoToMe }) => (
  <DropdownButton
    bsStyle="default"
    title={<CustomTitle avatarUrl={avatarUrl} />}
    id="userDropdown"
    noCaret
    pullRight
    className="app-user-dropdown"
  >
    <MenuItem onClick={handleGoToMe}>My Activities</MenuItem>
    <MenuItem divider />
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </DropdownButton>
);
UserMenuHeader.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleGoToMe: PropTypes.func.isRequired,
};

export default UserMenuHeader;
