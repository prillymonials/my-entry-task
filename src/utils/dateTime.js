export default class DateTime {
  static getPaddingZero(number) {
    return `0${number}`.slice(-2);
  }

  static getMonth(month) {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  }

  static getDateFromUnix(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const result = [];

    result.push(date.getDate());
    result.push(DateTime.getMonth(date.getMonth()));
    result.push(date.getFullYear());

    return result.join(' ');
  }

  static getTime12FromUnix(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const result = [];

    let hours = date.getHours();
    const AmPm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;

    result.push(`${hours}`);
    result.push(DateTime.getPaddingZero(date.getMinutes()));

    return [result.join('.'), AmPm];
  }

  static getTimeFromUnix(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const result = [];

    result.push(DateTime.getPaddingZero(date.getHours()));
    result.push(DateTime.getPaddingZero(date.getMinutes()));

    return result.join(':');
  }

  static getDateTimeFromUnix(unixTimestamp) {
    return `${DateTime.getDateFromUnix(unixTimestamp)} ${DateTime.getTimeFromUnix(unixTimestamp)}`;
  }

  static getSimpleDateFromUnix(unixTimestamp) {
    if (!unixTimestamp) {
      return '';
    }

    const date = new Date(unixTimestamp);
    const result = [];

    result.push(DateTime.getPaddingZero(date.getMonth() + 1));
    result.push(DateTime.getPaddingZero(date.getDate()));
    result.push(date.getFullYear());

    return result.join('/');
  }

  static getTodayUnix() {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    endDate.setDate(startDate.getDate() + 1);

    return [startDate.getTime(), endDate.getTime() - 1];
  }

  static getTommorowUnix() {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0, 0, 0, 0);
    endDate.setDate(startDate.getDate() + 2);
    endDate.setHours(0, 0, 0, 0);

    return [startDate.getTime(), endDate.getTime() - 1];
  }

  static getThisWeekUnix() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const firstDay = date.getDate() - date.getDay();
    const lastDay = firstDay + 7;

    const firstDate = new Date(date);
    firstDate.setDate(firstDay);
    const lastDate = new Date(date);
    lastDate.setDate(lastDay);
    return [firstDate.getTime(), lastDate.getTime() - 1];
  }

  static getThisMonthUnix() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
    return [firstDay.getTime(), lastDay.getTime() - 1];
  }
}
