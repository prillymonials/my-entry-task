import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostContent from '../components/PostContent';
import PostNotFound from '../components/PostNotFound';
import SearchInfo from '../components/SearchInfo';
import { onRequest, postClear, onRequestDetail } from '../actions/post';
import { clearSearch } from '../actions/search';
import { goToPostDetail } from '../actions/route';
import { GAP_SCROLL } from '../constants';
import PostTypes from '../utils/propTypes';
import getSearchDescription from '../utils/searchDescription';
import '../styles/Post.scss';

class Post extends Component {
  static propTypes = {
    postData: PropTypes.arrayOf(PostTypes).isRequired,
    postTotal: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLastItem: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    dateMode: PropTypes.string,
    channelName: PropTypes.string,
    startAt: PropTypes.number,
    endAt: PropTypes.number,
    isSearching: PropTypes.bool.isRequired,
    requestPost: PropTypes.func.isRequired,
    requestPostDetail: PropTypes.func.isRequired,
    goToPostDetail: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dateMode: null,
    channelName: null,
    startAt: null,
    endAt: null,
  };

  componentDidMount() {
    const { requestPost, postData, isLastItem } = this.props;

    if (postData.length === 0 && !isLastItem) {
      requestPost(this.addScrollEvent);
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

  handleClearSearch = () => {
    const { clearPost, onClearSearch, requestPost } = this.props;
    clearPost();
    onClearSearch();
    requestPost();
  };

  handleScrollToBottom = () => {
    this.rootRef.scrollTop = this.rootRef.scrollHeight;
  };

  handleScroll = () => {
    const { isLoading, isLastItem, requestPost } = this.props;
    const { offsetTop, scrollHeight } = this.rootRef;
    const { innerHeight, scrollY } = window;

    if (
      innerHeight + scrollY > offsetTop + scrollHeight - GAP_SCROLL
      && !isLoading
      && !isLastItem
    ) {
      requestPost();
      this.handleScrollToBottom();
    }
  };

  handleClick = (post) => {
    const { goToPostDetail: goToPostDetailProps, requestPostDetail } = this.props;
    requestPostDetail(post, goToPostDetailProps);
  };

  render() {
    const {
      postData,
      postTotal,
      isLoading,
      isSearching,
      isSidebarOpen,
      dateMode,
      channelName,
      startAt,
      endAt,
    } = this.props;

    return (
      <div className="app-post" ref={this.setRootRef}>
        {isSearching && !isLoading && !isSidebarOpen ? (
          <SearchInfo
            totalSearch={postTotal}
            searchDescription={getSearchDescription(dateMode, channelName, startAt, endAt)}
            handleClearSearch={this.handleClearSearch}
          />
        ) : null}
        {postData.length === 0 && !isLoading ? <PostNotFound /> : null}
        {postData.map(post => (
          <PostContent key={`post-${post.id}`} post={post} handleClick={this.handleClick} />
        ))}
        {isLoading ? <h4 className="app-post-loading">LOADING...</h4> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postData: state.post.data,
  postTotal: state.post.total,
  isLoading: state.post.isLoading,
  isLastItem: state.post.isLastItem,
  isSidebarOpen: state.route.isSidebarOpen,
  ...state.search,
});

const mapDispatchToProps = {
  requestPost: onRequest,
  requestPostDetail: onRequestDetail,
  clearPost: postClear,
  onClearSearch: clearSearch,
  goToPostDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
