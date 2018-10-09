import React from 'react';
import PropTypes from 'prop-types';
import ReplyIcon from '../assets/svg/reply.svg';
import '../styles/PostCommentContent.scss';

const PostCommentContent = ({ comment, handleReply }) => (
  <div className="app-post-comment">
    <img src={comment.avatarUrl} alt="user" className="app-post-comment-avatar" />
    <div className="app-post-comment-content">
      <div className="app-post-comment-user">
        <b>{comment.username}</b>
        <span>{comment.postAt}</span>
      </div>
      <p>{comment.comment}</p>
    </div>
    <ReplyIcon
      className="app-post-comment-reply-icon"
      onClick={() => handleReply(comment.username)}
    />
  </div>
);

PostCommentContent.propTypes = {
  comment: PropTypes.any.isRequired,
  handleReply: PropTypes.func.isRequired,
};

export default PostCommentContent;
