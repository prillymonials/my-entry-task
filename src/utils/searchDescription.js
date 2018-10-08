import DateTime from './dateTime';

export default function getSearchDescription(dateMode, channelName, startAt, endAt) {
  if (dateMode === null || channelName === null) {
    return '';
  }

  if (dateMode === 'ANYTIME') {
    return `${channelName} activities`;
  }

  return `${channelName} activities from ${DateTime.getSimpleDateFromUnix(
    startAt,
  )} to ${DateTime.getSimpleDateFromUnix(endAt)}`;
}
