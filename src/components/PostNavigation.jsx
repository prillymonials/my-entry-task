import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InfoOutlineIcon from '../assets/svg/info-outline.svg';
import PeopleOutlineIcon from '../assets/svg/people-outline.svg';
import CommentOutlineIcon from '../assets/svg/comment-outline.svg';
import InfoIcon from '../assets/svg/info.svg';
import PeopleIcon from '../assets/svg/people.svg';
import CommentIcon from '../assets/svg/comment.svg';
import '../styles/PostNavigation.scss';

const PostNavigation = ({ navigation }) => (
  <Fragment>
    <li className={navigation === 'detail' ? 'active' : ''}>
      <div className="app-post-nav-wrapper">
        {navigation === 'detail' ? (
          <InfoIcon className="app-post-nav-icon" />
        ) : (
          <InfoOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Details</span>
      </div>
    </li>
    <li className={navigation === 'participant' ? 'active' : ''}>
      <div className="app-post-nav-wrapper">
        {navigation === 'participant' ? (
          <PeopleIcon className="app-post-nav-icon" />
        ) : (
          <PeopleOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Participants</span>
      </div>
    </li>
    <li className={navigation === 'comment' ? 'active' : ''}>
      <div className="app-post-nav-wrapper">
        {navigation === 'comment' ? (
          <CommentIcon className="app-post-nav-icon" />
        ) : (
          <CommentOutlineIcon className="app-post-nav-icon" />
        )}
        <span>Comments</span>
      </div>
    </li>
  </Fragment>
);

PostNavigation.propTypes = {
  navigation: PropTypes.string,
};

PostNavigation.defaultProps = {
  navigation: undefined,
};

export default PostNavigation;
