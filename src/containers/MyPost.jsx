import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmailIcon from '../assets/svg/email.svg';
import MyPostNavigation from '../components/MyPostNavigation';
import PostContent from '../components/PostContent';
import PostNotFound from '../components/PostNotFound';
import { onMyPostRequest, myPostSetTab } from '../actions/myPost';
import { goToPostDetail } from '../actions/route';
import { onRequestDetail } from '../actions/post';
import { GAP_SCROLL } from '../constants';
import '../styles/MyPost.scss';

class MyPost extends Component {
  static propTypes = {
    user: PropTypes.any,
    myPost: PropTypes.any.isRequired,
    handleMyPostRequest: PropTypes.func.isRequired,
    goToPostDetail: PropTypes.func.isRequired,
    requestPostDetail: PropTypes.func.isRequired,
    handleSetTab: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: {},
  };

  componentDidMount() {
    const { myPost, handleMyPostRequest } = this.props;
    const { tab } = myPost;

    if (!myPost[tab].isLastItem && myPost[tab].data.length === 0) {
      handleMyPostRequest(tab, this.addScrollEvent);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  setRootRef = (ref) => {
    this.rootRef = ref;
  };

  addScrollEvent = () => {
    window.addEventListener('scroll', this.handleScroll, false);
  };

  handleScrollToBottom = () => {
    this.rootRef.scrollTop = this.rootRef.scrollHeight;
  };

  handleScroll = () => {
    const { myPost, handleMyPostRequest } = this.props;
    const { tab } = myPost;
    const { offsetTop, scrollHeight } = this.rootRef;
    const { innerHeight, scrollY } = window;

    if (
      innerHeight + scrollY > offsetTop + scrollHeight - GAP_SCROLL
      && !myPost.isLoading
      && !myPost[tab].isLastItem
    ) {
      handleMyPostRequest(tab);
    }
  };

  handleClickPost = (post) => {
    const { goToPostDetail: goToPostDetailProps, requestPostDetail } = this.props;
    requestPostDetail(post, goToPostDetailProps);
  };

  handleClickNavigation = (tab) => {
    const { myPost, handleMyPostRequest, handleSetTab } = this.props;

    if (!myPost[tab].isLastItem && myPost[tab].data.length === 0) {
      handleMyPostRequest(tab);
    } else {
      handleSetTab(tab);
    }
  };

  render() {
    const { user, myPost } = this.props;
    const { tab } = myPost;
    const { isLoading } = myPost;
    const { data: posts } = myPost[tab];

    return (
      <div className="app-my-post">
        <div className="app-my-post-header">
          <img src={user.avatarUrl} alt="User" className="app-my-post-avatar" />
          <h3 className="app-my-post-username">{user.username}</h3>
          <div className="app-my-post-email">
            <EmailIcon className="app-my-post-email-icon" />
            <span>{user.email}</span>
          </div>
        </div>
        <MyPostNavigation navigation={tab} handleClickNavigation={this.handleClickNavigation} />
        <div className="app-my-post-list" ref={this.setRootRef}>
          {posts.length === 0 && !isLoading ? <PostNotFound /> : null}
          {posts.map(post => (
            <PostContent key={`post-${post.id}`} post={post} handleClick={this.handleClickPost} />
          ))}
          {isLoading ? <h4 className="app-my-post-loading">LOADING...</h4> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  myPost: state.myPost,
});

const mapDispatchToProps = {
  handleMyPostRequest: onMyPostRequest,
  requestPostDetail: onRequestDetail,
  goToPostDetail,
  handleSetTab: myPostSetTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPost);
