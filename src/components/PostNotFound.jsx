import React from 'react';
import NoActivity from '../assets/svg/no-activity.svg';
import '../styles/PostNotFound.scss';

const PostNotFound = () => (
  <div className="app-post-not-found">
    <NoActivity className="app-post-not-found-icon" />
    <p className="app-post-not-found-label">No activity found</p>
  </div>
);

export default PostNotFound;
