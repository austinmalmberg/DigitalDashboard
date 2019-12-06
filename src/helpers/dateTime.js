
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dateFormats = {
  shortest: '0/0',
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
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';

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
    case dateFormats.shortest:
      return `${month}/${day}`;
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
  if (!d1 || !d2) return false;

  if (!(d1 instanceof Date))
    d1 = new Date(d1);

  if (!(d2 instanceof Date))
    d2 = new Date(d2);

  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

/**
 * Finds and returns the date from the given date by adding (or substracting)
 * 12 hours at a time. Also sets the time to 11:59:01 pm
 *
 * This shouldn't be used if the numDays needs to be big.
 *
 * @param {Date} dateTime -
 * @param {Number} numDays - the number of days from the given date. Can be
 * positive or negative.
*/
function addDays(dateTime, numDays) {

  const halfday = 1000 * 60 * 60 * 12 * Math.sign(numDays);

  if (numDays < 0)
    numDays *= -1;

  while (numDays > 0) {
    let day = dateTime.getDate();
    dateTime = new Date(dateTime.getTime() + halfday);

    if (dateTime.getDate() !== day)
      --numDays;
  }

  dateTime.setHours(23);
  dateTime.setMinutes(59);
  dateTime.setSeconds(1);

  return dateTime;
}

export { dateFormats, formatTime, formatDate, getDayInWeek, isSameDate, addDays };
