import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CrossIcon from '../assets/svg/cross.svg';
import SendIcon from '../assets/svg/send.svg';
import '../styles/PostDetailComment.scss';

const PostDetailComment = ({ commentRef, handleCloseComment, handleSendComment }) => (
  <Fragment>
    <button type="button" className="post-comment-close" onClick={handleCloseComment}>
      <CrossIcon />
    </button>
    <input
      type="text"
      placeholder="Leave your comment here"
      className="post-comment-input"
      ref={commentRef}
    />
    <button type="button" className="post-comment-send" onClick={handleSendComment}>
      <SendIcon />
    </button>
  </Fragment>
);

PostDetailComment.propTypes = {
  commentRef: PropTypes.func.isRequired,
  handleCloseComment: PropTypes.func.isRequired,
  handleSendComment: PropTypes.func.isRequired,
};

export default PostDetailComment;
