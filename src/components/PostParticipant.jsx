import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckOutlineIcon from '../assets/svg/check-outline.svg';
import LikeOutlineIcon from '../assets/svg/like-outline.svg';
import '../styles/PostParticipant.scss';

const PostParticipant = ({
  totalUserGoing, totalUserLikes, userGoing, userLike,
}) => (
  <Fragment>
    <div className="app-post-participant">
      <div className="app-post-summary">
        <CheckOutlineIcon className="app-post-summary-icon" />
        {`${totalUserGoing} Going`}
      </div>
      <div className="app-post-summary-image">
        {userGoing.map((going, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <img src={going} alt="user" key={`user-going-${index}`} />
        ))}
      </div>
    </div>
    <div className="app-post-participant">
      <div className="app-post-summary">
        <LikeOutlineIcon className="app-post-summary-icon" />
        {`${totalUserLikes} Likes`}
      </div>
      <div className="app-post-summary-image">
        {userLike.map((going, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <img src={going} alt="user" key={`user-going-${index}`} />
        ))}
      </div>
    </div>
  </Fragment>
);

PostParticipant.propTypes = {
  totalUserGoing: PropTypes.number.isRequired,
  totalUserLikes: PropTypes.number.isRequired,
  userGoing: PropTypes.arrayOf(PropTypes.string).isRequired,
  userLike: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PostParticipant;
