import React from 'react';
import PropTypes from 'prop-types';
import PostTypes from '../utils/propTypes';
import TimeIcon from '../assets/svg/time.svg';
import CheckIcon from '../assets/svg/check.svg';
import CheckOutlineIcon from '../assets/svg/check-outline.svg';
import LikeIcon from '../assets/svg/like.svg';
import LikeOutlineIcon from '../assets/svg/like-outline.svg';
import DateTime from '../utils/dateTime';
import '../styles/PostContent.scss';

const PostContent = ({ post, handleClick }) => {
  const isLiking = post.isUserLike;
  const isGoing = post.isUserGoing;

  return (
    <div className="app-post-container">
      <div className="app-post-header">
        <img src={post.createdAvatarUrl} alt="user" className="app-post-avatar" />
        <span className="app-post-username">{post.createdBy}</span>
        <span className="app-post-channel">{post.channelName}</span>
      </div>
      {/* eslint-disable-next-line */}
      <h1 className="app-post-title" onClick={() => handleClick(post)}>
        {post.title}
      </h1>
      <div className="app-post-date">
        <TimeIcon className="app-post-date-icon" />
        <span>
          {DateTime.getDateTimeFromUnix(post.startAt)}
          {' - '}
          {DateTime.getDateTimeFromUnix(post.endAt)}
        </span>
      </div>
      <div className="app-post-description">
        {post.description.length < 298 ? post.description : `${post.description.substr(0, 297)}...`}
      </div>
      <div className="app-post-footer">
        {isGoing ? (
          <CheckIcon className="app-post-going" />
        ) : (
          <CheckOutlineIcon className="app-post-not-going" />
        )}
        <span className={isGoing ? 'app-post-description' : 'app-post-not-description'}>
          {isGoing ? 'I am going!' : `${post.totalUserGoing} Going`}
        </span>
        {isLiking ? (
          <LikeIcon className="app-post-like" />
        ) : (
          <LikeOutlineIcon className="app-post-not-like" />
        )}
        <span className={isLiking ? 'app-post-description' : 'app-post-not-description'}>
          {isLiking ? 'I like it' : `${post.totalUserLikes} Likes`}
        </span>
      </div>
    </div>
  );
};

PostContent.propTypes = {
  post: PostTypes.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PostContent;
