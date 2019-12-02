
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dateFormats = {
  short: '0/0/00',
  longerButStillShort: '00/00/0000',
  businessCasual: 'mon 0, 0000',
  formal: 'month 00, 0000'
};

function formatTime(date, militaryTime, displaySecs) {
  let hour = date.getHours();
  if (!militaryTime && hour > 12) {
    hour -= 12;
  }

  const min = date.getMinutes().toString().padStart(2, '0');
  const secs = date.getSeconds().toString().padStart(2, '0');
  const ampm = hour < 12 ? 'AM' : 'PM';

  if (displaySecs)
    return `${hour}:${min}:${secs}${militaryTime ? '' : ' '+ampm}`;

  return `${hour}:${min}${militaryTime ? '' : ' '+ampm}`;
}

function formatDate(date, format) {

  if (!format)
    return formatDate(date, dateFormats.short);

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  switch(format) {
    case dateFormats.short:
      return `${month}/${day}/${year.toString().substring(year.length - 2)}`;
    case dateFormats.longerButStillShort:
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    case dateFormats.businessCasual:
      return `${monthNames[month].length <= 4 ? monthNames[month] : monthNames[month].substring(0, 3)} ${day}, ${year}`;
    case dateFormats.formal:
      return `${monthNames[month]} ${day}, ${year}`;
    default:
      return formatDate(date, dateFormats.short);
  }
}

function getDayInWeek(date, format) {

  const day = daysOfTheWeek[date.getDay()];

  if (format && format === dateFormats.short)
    return day.substring(0, 3);

  return day;
}

function isSameDate(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export { dateFormats, formatTime, formatDate, getDayInWeek, isSameDate };
