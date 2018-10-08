import React from 'react';
import PropTypes from 'prop-types';
import SearchDateLater from '../containers/SearchDateLater';
import '../styles/SearchContent.scss';

const SearchDate = ({ mode, currentMode, handleOnSelect }) => (
  <div className="app-search-container">
    <div className="app-search-title">
      <span>DATE</span>
    </div>
    <div className="app-search-date-list">
      {mode.map(type => (
        // eslint-disable-next-line
        <span
          key={`date-${type}`}
          className={currentMode === type ? 'active' : ''}
          onClick={() => {
            handleOnSelect(type);
          }}
        >
          {type}
        </span>
      ))}
      <SearchDateLater />
    </div>
  </div>
);

SearchDate.propTypes = {
  mode: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string,
  handleOnSelect: PropTypes.func.isRequired,
};

SearchDate.defaultProps = {
  currentMode: null,
};

export default SearchDate;
