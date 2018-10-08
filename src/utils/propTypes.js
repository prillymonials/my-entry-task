import PropTypes from 'prop-types';

const PostProps = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  createdBy: PropTypes.string,
  createdAvatarUrl: PropTypes.string,
  channelName: PropTypes.string,
  startAt: PropTypes.number,
  endAt: PropTypes.number,
  description: PropTypes.string,
  totalUserGoing: PropTypes.number,
  totalUserLikes: PropTypes.number,
  isUserGoing: PropTypes.bool,
  isUserLike: PropTypes.bool,
});

export default PostProps;
