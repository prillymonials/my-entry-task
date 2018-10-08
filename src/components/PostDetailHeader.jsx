import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PostDetailHeader.scss';

const PostDetailHeader = ({
  channelName, title, avatarUrl, username,
}) => (
  <div className="app-post-detail-header">
    <span className="app-post-channel">{channelName}</span>
    <h1 className="app-post-title">{title}</h1>
    <div className="app-post-author">
      <img src={avatarUrl} alt="User" className="app-post-avatar" />
      <div className="app-post-author-info">
        <span className="app-post-username">{username}</span>
        <span className="app-post-publish">Published 2 days ago</span>
      </div>
    </div>
  </div>
);

PostDetailHeader.propTypes = {
  channelName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PostDetailHeader;
