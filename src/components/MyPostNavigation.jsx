import React from 'react';
import PropTypes from 'prop-types';
import LikeOutlineIcon from '../assets/svg/like-outline.svg';
import CheckOutlineIcon from '../assets/svg/check-outline.svg';
import PastOutlineIcon from '../assets/svg/past-outline.svg';
import LikeIcon from '../assets/svg/like.svg';
import CheckIcon from '../assets/svg/check.svg';
import PastIcon from '../assets/svg/past.svg';
import '../styles/PostNavigation.scss';

const MyPostNavigation = ({ navigation, handleClickNavigation }) => (
  <ul className="app-post-nav">
    {/* eslint-disable-next-line */}
    <li
      className={navigation === 'like' ? 'active' : ''}
      onClick={() => handleClickNavigation('like')}
    >
      <div className="app-post-nav-wrapper">
        {navigation === 'like' ? (
          <LikeIcon className="app-post-nav-icon" />
        ) : (
          <LikeOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Like</span>
      </div>
    </li>
    {/* eslint-disable-next-line */}
    <li
      className={navigation === 'going' ? 'active' : ''}
      onClick={() => handleClickNavigation('going')}
    >
      <div className="app-post-nav-wrapper">
        {navigation === 'going' ? (
          <CheckIcon className="app-post-nav-icon" />
        ) : (
          <CheckOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Going</span>
      </div>
    </li>
    {/* eslint-disable-next-line */}
    <li
      className={navigation === 'past' ? 'active' : ''}
      onClick={() => handleClickNavigation('past')}
    >
      <div className="app-post-nav-wrapper">
        {navigation === 'past' ? (
          <PastIcon className="app-post-nav-icon" />
        ) : (
          <PastOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Past</span>
      </div>
    </li>
  </ul>
);

MyPostNavigation.propTypes = {
  navigation: PropTypes.string,
  handleClickNavigation: PropTypes.func.isRequired,
};

MyPostNavigation.defaultProps = {
  navigation: undefined,
};

export default MyPostNavigation;
