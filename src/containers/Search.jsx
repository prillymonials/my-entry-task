import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchDate, searchChannel } from '../actions/search';
import SearchDate from '../components/SearchDate';
import SearchChannel from '../components/SearchChannel';
import SearchButton from './SearchButton';
import DateTime from '../utils/dateTime';
import '../styles/Search.scss';

class Search extends Component {
  static propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    dateMode: PropTypes.string,
    startAt: PropTypes.number,
    endAt: PropTypes.number,
    channelName: PropTypes.string,
    channelNameList: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSearchDate: PropTypes.func.isRequired,
    setChannelName: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dateMode: null,
    startAt: null,
    endAt: null,
    channelName: null,
  };

  handleOnSelectDate = (mode) => {
    const { setSearchDate } = this.props;
    let startAt;
    let endAt;

    switch (mode) {
      case 'TODAY':
        [startAt, endAt] = DateTime.getTodayUnix();
        break;
      case 'TOMORROW':
        [startAt, endAt] = DateTime.getTommorowUnix();
        break;
      case 'THIS WEEK':
        [startAt, endAt] = DateTime.getThisWeekUnix();
        break;
      case 'THIS MONTH':
        [startAt, endAt] = DateTime.getThisMonthUnix();
        break;
      default:
        startAt = null;
        endAt = null;
    }

    setSearchDate(mode, startAt, endAt);
  };

  handleOnSelectChannelName = (mode) => {
    const { setChannelName } = this.props;

    setChannelName(mode);
  };

  render() {
    const {
      isSidebarOpen, dateMode, startAt, endAt, channelName, channelNameList,
    } = this.props;
    const openClassName = isSidebarOpen ? 'open' : '';
    const searchDateMode = ['ANYTIME', 'TODAY', 'TOMORROW', 'THIS WEEK', 'THIS MONTH'];

    return (
      <div className={`app-search-menu ${openClassName}`}>
        <SearchDate
          mode={searchDateMode}
          currentMode={dateMode}
          startAt={startAt}
          endAt={endAt}
          handleOnSelect={this.handleOnSelectDate}
        />
        <SearchChannel
          mode={channelNameList}
          currentMode={channelName}
          handleOnSelect={this.handleOnSelectChannelName}
        />
        <SearchButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSidebarOpen: state.route.isSidebarOpen,
  dateMode: state.search.dateMode,
  channelName: state.search.channelName,
  channelNameList: state.search.channelNameList,
});

const mapDispatchToProps = {
  setSearchDate: searchDate,
  setChannelName: searchChannel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
