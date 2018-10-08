import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchInfo.scss';

const SearchInfo = ({ totalSearch, searchDescription, handleClearSearch }) => (
  <div className="app-search-info">
    <h4 className="app-search-result-label">
      {totalSearch}
      {' results'}
    </h4>
    <button type="button" className="app-search-clear-btn" onClick={handleClearSearch}>
      CLEAR SEARCH
    </button>
    <span className="app-search-description">
      Searched for
      {` ${searchDescription}`}
    </span>
  </div>
);

SearchInfo.propTypes = {
  totalSearch: PropTypes.number.isRequired,
  searchDescription: PropTypes.string.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
};

export default SearchInfo;
