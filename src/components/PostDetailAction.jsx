import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CommentIcon from '../assets/svg/comment-single.svg';
import LikeOutlineIcon from '../assets/svg/like-outline.svg';
import LikeIcon from '../assets/svg/like.svg';
import CheckOutlineIcon from '../assets/svg/check-outline.svg';
import CheckIcon from '../assets/svg/check.svg';
import '../styles/PostDetailAction.scss';

const PostDetailAction = ({
  handleOpenComment,
  isUserLike,
  isUserGoing,
  handleSetLike,
  handleSetGoing,
}) => {
  const goingClassName = isUserGoing ? 'going' : '';

  return (
    <Fragment>
      <button
        type="button"
        className="post-action-button post-action-button-icon"
        onClick={handleOpenComment}
      >
        <CommentIcon />
      </button>
      <button
        type="button"
        className="post-action-button post-action-button-icon post-action-like"
        onClick={() => handleSetLike(isUserLike)}
      >
        {isUserLike ? <LikeIcon className="fill" /> : <LikeOutlineIcon />}
      </button>
      <button
        type="button"
        className={`post-action-button post-action-button-going ${goingClassName}`}
        onClick={() => handleSetGoing(isUserGoing)}
      >
        {isUserGoing ? <CheckIcon /> : <CheckOutlineIcon />}
        {isUserGoing ? 'I am going' : 'Join'}
      </button>
    </Fragment>
  );
};

PostDetailAction.propTypes = {
  handleOpenComment: PropTypes.func.isRequired,
  handleSetLike: PropTypes.func.isRequired,
  handleSetGoing: PropTypes.func.isRequired,
  isUserLike: PropTypes.bool.isRequired,
  isUserGoing: PropTypes.bool.isRequired,
};

export default PostDetailAction;
