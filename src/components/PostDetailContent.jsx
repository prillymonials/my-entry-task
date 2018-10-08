import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DateFromIcon from '../assets/svg/date-from.svg';
import DateToIcon from '../assets/svg/date-to.svg';
import DateTime from '../utils/dateTime';
import '../styles/PostDetailContent.scss';

const PostDetailContent = ({ description, startAt, endAt }) => {
  const startAtHour = DateTime.getTime12FromUnix(startAt);
  const endAtHour = DateTime.getTime12FromUnix(endAt);

  return (
    <Fragment>
      <div className="app-post-gallery">
        <img src="/assets/flower1.jpg" alt="gallery" />
        <img src="/assets/flower2.jpg" alt="gallery" />
        <img src="/assets/flower3.jpg" alt="gallery" />
      </div>
      <div className="app-post-description">{description}</div>
      <div className="app-post-calendar">
        <h5>When</h5>
        <div className="app-post-calendar-wrapper">
          <div className="app-post-calendar-detail">
            <p>
              <DateFromIcon className="app-post-calendar-icon" />
              {DateTime.getDateFromUnix(startAt)}
            </p>
            <h1>
              {startAtHour[0]}
              <small>{startAtHour[1]}</small>
            </h1>
          </div>
          <div className="app-post-calendar-detail">
            <p>
              <DateToIcon className="app-post-calendar-icon" />
              {DateTime.getDateFromUnix(endAt)}
            </p>
            <h1>
              {endAtHour[0]}
              <small>{endAtHour[1]}</small>
            </h1>
          </div>
        </div>
      </div>
      <div className="app-post-location">
        <h5>Where</h5>
        <b>Marina Bay Sands</b>
        <span>10 Bayfront Ave, S018956</span>
        <img src="/assets/maps.png" alt="map" />
      </div>
    </Fragment>
  );
};

PostDetailContent.propTypes = {
  description: PropTypes.string.isRequired,
  startAt: PropTypes.number.isRequired,
  endAt: PropTypes.number.isRequired,
};

export default PostDetailContent;
