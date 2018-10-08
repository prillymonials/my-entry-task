import React from 'react';
import PropTypes from 'prop-types';

const SearchChannel = ({ mode, currentMode, handleOnSelect }) => (
  <div className="app-search-container app-search-channel">
    <div className="app-search-title">
      <span>CHANNEL</span>
    </div>
    <div className="app-search-channel-list">
      {/* eslint-disable-next-line */}
      <span className={currentMode === 'All' ? 'active' : ''} onClick={() => handleOnSelect('All')}>
        All
      </span>
      {mode.map(channel => (
        // eslint-disable-next-line
        <span
          key={`channel-${channel}`}
          className={currentMode === channel ? 'active' : ''}
          onClick={() => {
            handleOnSelect(channel);
          }}
        >
          {channel}
        </span>
      ))}
    </div>
  </div>
);

SearchChannel.propTypes = {
  mode: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string,
  handleOnSelect: PropTypes.func.isRequired,
};

SearchChannel.defaultProps = {
  currentMode: null,
};

export default SearchChannel;
