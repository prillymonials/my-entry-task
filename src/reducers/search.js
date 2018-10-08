import * as ActionType from '../constants/ActionType';

const initialState = {
  dateMode: null,
  startAt: null,
  endAt: null,
  channelName: null,
  channelNameList: [],
  isDatePickerOpened: false,
  isSearching: false,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case ActionType.SEARCH_DATE:
      return {
        ...state,
        dateMode: action.dateMode,
        startAt: action.startAt,
        endAt: action.endAt,
      };
    case ActionType.SEARCH_CHANNEL:
      return {
        ...state,
        channelName: action.channelName,
      };
    case ActionType.SEARCH_CHANNEL_LIST:
      return {
        ...state,
        channelNameList: action.channelNameList,
      };
    case ActionType.SEARCH_OPEN_DATE_PICKER:
      return {
        ...state,
        isDatePickerOpened: true,
      };
    case ActionType.SEARCH_CLOSE_DATE_PICKER:
      return {
        ...state,
        isDatePickerOpened: false,
      };
    case ActionType.SEARCH_ON_SELECT_DATE_PICKER:
      return {
        ...state,
        isDatePickerOpened: false,
        startAt: action.startAt,
        endAt: action.endAt,
      };
    case ActionType.SEARCH_SUBMIT:
      return {
        ...state,
        isSearching: true,
      };
    case ActionType.SEARCH_CLEAR:
      return {
        ...state,
        isSearching: false,
        dateMode: null,
        startAt: null,
        endAt: null,
        channelName: null,
      };
    default:
      return state;
  }
}
