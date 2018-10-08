import * as ActionType from '../constants/ActionType';
import ChannelService from '../api/channel';

export const searchDate = (dateMode, startAt, endAt) => ({
  type: ActionType.SEARCH_DATE,
  dateMode,
  startAt,
  endAt,
});
export const searchChannel = channelName => ({ type: ActionType.SEARCH_CHANNEL, channelName });
export const openDatePicker = () => ({ type: ActionType.SEARCH_OPEN_DATE_PICKER });
export const closeDatePicker = () => ({ type: ActionType.SEARCH_CLOSE_DATE_PICKER });
export const onSelectDatePicker = (startAt, endAt) => ({
  type: ActionType.SEARCH_ON_SELECT_DATE_PICKER,
  startAt,
  endAt,
});

export const setChannelList = channelNameList => ({
  type: ActionType.SEARCH_CHANNEL_LIST,
  channelNameList,
});

export const submitSearch = () => ({ type: ActionType.SEARCH_SUBMIT });
export const clearSearch = () => ({ type: ActionType.SEARCH_CLEAR });

export const fetchChannelList = () => (dispatch) => {
  ChannelService.getList().then(response => dispatch(setChannelList(response.channels)));
};
