import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import Toast from './Toast';
import PostDetailHeader from '../components/PostDetailHeader';
import PostDetailContent from '../components/PostDetailContent';
import PostNavigation from '../components/PostNavigation';
import PostParticipant from '../components/PostParticipant';
import PostCommentContent from '../components/PostCommentContent';
import PostDetailAction from '../components/PostDetailAction';
import PostDetailComment from '../components/PostDetailComment';
import { openComment, closeComment, openCommentWithCallback } from '../actions/route';
import { handleToast } from '../actions/toast';
import { postAddComment, postSetGoing, postSetLike } from '../actions/post';
import '../styles/PostDetail.scss';

class PostDetail extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    post: PropTypes.any.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.any,
    toastMessage: PropTypes.string,
    isCommenting: PropTypes.bool.isRequired,
    onOpenCommentWithCallback: PropTypes.func.isRequired,
    onOpenComment: PropTypes.func.isRequired,
    onCloseComment: PropTypes.func.isRequired,
    submitComment: PropTypes.func.isRequired,
    setGoing: PropTypes.func.isRequired,
    setLike: PropTypes.func.isRequired,
    triggerToast: PropTypes.func.isRequired,
  };

  static defaultProps = {
    toastMessage: null,
    user: {},
  };

  state = {
    navigation: null,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleScroll = () => {
    const { scrollY } = window;
    const { navigation } = this.state;

    const { offsetTop: detailTop, offsetHeight: detailHeight } = this.detailRef;
    const { offsetTop: participantTop, offsetHeight: participantHeight } = this.participantRef;
    const { offsetTop: commentTop, offsetHeight: commentHeight } = this.commentRef;

    if (detailTop - 90 <= scrollY && scrollY <= detailTop + detailHeight - 90) {
      if (navigation !== 'detail') {
        this.setState({ navigation: 'detail' });
      }
    } else if (
      participantTop - 90 <= scrollY
      && scrollY <= participantTop + participantHeight - 90
    ) {
      if (navigation !== 'participant') {
        this.setState({ navigation: 'participant' });
      }
    } else if (commentTop - 90 <= scrollY && scrollY <= commentTop + commentHeight - 90) {
      if (navigation !== 'comment') {
        this.setState({ navigation: 'comment' });
      }
    } else if (navigation !== null) {
      this.setState({ navigation: null });
    }
  };

  setDetailRef = (ref) => {
    this.detailRef = ref;
  };

  setParticipantRef = (ref) => {
    this.participantRef = ref;
  };

  setCommentRef = (ref) => {
    this.commentRef = ref;
  };

  setCommentInputRef = (ref) => {
    this.commentInputRef = ref;
  };

  handleOpenComment = () => {
    const { onOpenComment } = this.props;
    onOpenComment();
  };

  handleCloseComment = () => {
    const { onCloseComment } = this.props;
    onCloseComment();
  };

  handleReply = (username) => {
    const { onOpenCommentWithCallback } = this.props;
    onOpenCommentWithCallback(() => {
      this.commentInputRef.value = `@${username} `;
    });
  };

  handleSendComment = () => {
    const {
      submitComment,
      triggerToast,
      post,
      user,
    } = this.props;
    const commentId = post.comments.length + 1;

    submitComment({
      id: commentId,
      username: user.username,
      postAt: 'now',
      avatarUrl: user.avatarUrl,
      comment: this.commentInputRef && this.commentInputRef.value,
    }, 'Comment published.');
    triggerToast();
    this.handleCloseComment();
  };

  handleSetGoing = (going) => {
    const { setGoing, triggerToast } = this.props;
    setGoing(!going, `Successfully to ${going ? 'leave' : 'join'} to the event.`);
    triggerToast();
  }

  handleSetLike = (like) => {
    const { setLike, triggerToast } = this.props;
    setLike(!like, `Succesfully ${like ? 'un-' : ''}liking this event.`);
    triggerToast();
  }

  render() {
    const { post, isCommenting, toastMessage } = this.props;
    const { navigation } = this.state;

    return (
      <div className="app-post-detail">
        <Toast isPost>{toastMessage}</Toast>
        <PostDetailHeader
          channelName={post.channelName}
          title={post.title}
          avatarUrl={post.createdAvatarUrl}
          username={post.createdBy}
        />
        <StickyContainer className="app-post-detail-content">
          <Sticky topOffset={-40}>
            {({ style }) => (
              <ul className="app-post-nav" style={style}>
                <PostNavigation navigation={navigation} />
              </ul>
            )}
          </Sticky>
          <div className="app-post-detail-wrapper" ref={this.setDetailRef}>
            <PostDetailContent
              description={post.description}
              startAt={post.startAt}
              endAt={post.endAt}
            />
          </div>
          <div className="app-post-participant-wrapper" ref={this.setParticipantRef}>
            <PostParticipant
              totalUserGoing={post.totalUserGoing}
              totalUserLikes={post.totalUserLikes}
              userGoing={post.userGoing}
              userLike={post.userLike}
            />
          </div>
          <div className="app-post-comment-wrapper" ref={this.setCommentRef}>
            {post.comments.map(comment => (
              <PostCommentContent
                key={`comment-post-${comment.id}`}
                comment={comment}
                handleReply={this.handleReply}
              />
            ))}
          </div>
        </StickyContainer>
        <div className="app-post-actions">
          {isCommenting ? (
            <PostDetailComment
              handleCloseComment={this.handleCloseComment}
              handleSendComment={this.handleSendComment}
              commentRef={this.setCommentInputRef}
            />
          ) : (
            <PostDetailAction
              handleOpenComment={this.handleOpenComment}
              handleSetGoing={this.handleSetGoing}
              handleSetLike={this.handleSetLike}
              isUserLike={post.isUserLike}
              isUserGoing={post.isUserGoing}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  post: state.post.currentPost,
  toastMessage: state.post.toastMessage,
  isCommenting: state.route.isCommenting,
});

const mapDispatchToProps = {
  onOpenCommentWithCallback: openCommentWithCallback,
  onOpenComment: openComment,
  onCloseComment: closeComment,
  submitComment: postAddComment,
  setGoing: postSetGoing,
  setLike: postSetLike,
  triggerToast: handleToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
