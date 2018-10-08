import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';
import {
  searchDate, openDatePicker, closeDatePicker, onSelectDatePicker,
} from '../actions/search';
import DateTime from '../utils/dateTime';
import DateFrom from '../assets/svg/date-from.svg';
import DateTo from '../assets/svg/date-to.svg';

class SearchDateLater extends Component {
  static propTypes = {
    setSearchDate: PropTypes.func.isRequired,
    currentMode: PropTypes.string,
    startAt: PropTypes.number,
    endAt: PropTypes.number,
    isDatePickerOpened: PropTypes.bool.isRequired,
    onOpenDatePicker: PropTypes.func.isRequired,
    onCloseDatePicker: PropTypes.func.isRequired,
    onSelectDatePicker: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentMode: null,
    startAt: null,
    endAt: null,
  };

  handleOnSelect = () => {
    const { setSearchDate } = this.props;
    const [startDate, endDate] = DateTime.getTodayUnix();
    setSearchDate('LATER', startDate, endDate);
  };

  handleShowModal = () => {
    const { onOpenDatePicker } = this.props;

    onOpenDatePicker();
  };

  handleCloseModal = () => {
    const { onCloseDatePicker } = this.props;
    onCloseDatePicker();
  };

  handleCalendarChange = (value) => {
    const { onSelectDatePicker: onSelect } = this.props;
    onSelect(value[0].getTime(), value[1].getTime() - 1);
  };

  render() {
    const {
      currentMode, startAt, endAt, isDatePickerOpened,
    } = this.props;
    const hideClassName = currentMode !== 'LATER' ? 'hide' : '';

    return (
      <div className="app-search-date-later">
        {/* eslint-disable-next-line */}
        <span className={currentMode === 'LATER' ? 'active' : ''} onClick={this.handleOnSelect}>
          LATER
        </span>
        <div className={`app-search-popover ${hideClassName}`}>
          <DateFrom className="app-search-popover-icon" />
          {/* eslint-disable-next-line */}
          <span className="app-search-calendar" onClick={this.handleShowModal}>
            {DateTime.getSimpleDateFromUnix(startAt)}
          </span>
          <span className="app-search-calendar"> - </span>
          <DateTo className="app-search-popover-icon" />
          {/* eslint-disable-next-line */}
          <span className="app-search-calendar" onClick={this.handleShowModal}>
            {DateTime.getSimpleDateFromUnix(endAt)}
          </span>
        </div>

        <Modal show={isDatePickerOpened} onHide={this.handleCloseModal} className="app-date-modal">
          <Modal.Body>
            <Calendar
              onChange={this.handleCalendarChange}
              value={[new Date(startAt), new Date(endAt)]}
              minDate={new Date()}
              returnValue="range"
              selectRange
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMode: state.search.dateMode,
  ...state.search,
});

const mapDispatchToProps = {
  setSearchDate: searchDate,
  onOpenDatePicker: openDatePicker,
  onCloseDatePicker: closeDatePicker,
  onSelectDatePicker,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDateLater);
