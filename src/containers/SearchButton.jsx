import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getSearchDescription from '../utils/searchDescription';
import { postClear, onRequest } from '../actions/post';
import { setSidebar } from '../actions/route';
import { submitSearch } from '../actions/search';
import Search from '../assets/svg/search.svg';
import '../styles/SearchButton.scss';

class SearchButton extends Component {
  static propTypes = {
    dateMode: PropTypes.string,
    channelName: PropTypes.string,
    startAt: PropTypes.number,
    endAt: PropTypes.number,
    clearPost: PropTypes.func.isRequired,
    onRequestPost: PropTypes.func.isRequired,
    setSidebar: PropTypes.func.isRequired,
    onSubmitSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dateMode: null,
    channelName: null,
    startAt: null,
    endAt: null,
  };

  handleSearch = () => {
    const {
      clearPost, onRequestPost, setSidebar: setSidebarProps, onSubmitSearch,
    } = this.props;
    clearPost();
    onSubmitSearch();
    setSidebarProps(false);
    onRequestPost();
  };

  render() {
    const {
      dateMode, channelName, startAt, endAt,
    } = this.props;
    const disabledBtn = dateMode === null || channelName === null;

    return (
      <button
        type="button"
        className="app-search-btn"
        disabled={disabledBtn}
        onClick={this.handleSearch}
      >
        <div className="app-search-search-label">
          <Search className="app-search-icon" />
          <span className="app-search-label"> SEARCH</span>
        </div>
        <div className="app-search-search-description">
          {getSearchDescription(dateMode, channelName, startAt, endAt)}
        </div>
      </button>
    );
  }
}

const mapStateToProps = state => ({
  dateMode: state.search.dateMode,
  channelName: state.search.channelName,
  startAt: state.search.startAt,
  endAt: state.search.endAt,
});

const mapDispatchToProps = {
  clearPost: postClear,
  onRequestPost: onRequest,
  setSidebar,
  onSubmitSearch: submitSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchButton);
