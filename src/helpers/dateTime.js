
import config from '../config';

const dateFormats = {
  shortest: '0/0',
  short: '0/0/00',
  longerButStillShort: '00/00/0000',
  businessCasual: 'mon 0, 0000',
  formal: 'month 00, 0000'
};

/**
 * Returns the time from the date specified.  If no date is given, returns the
 * current time.
 *
 * @param {Date} date - the given date (or the current date if omitted)
 * @param {Object} options - options to format the date based on those specified
 * in Date.prototype.toLocaleTimeString()
*/
function formatTime(date, options) {
  if (!date) return formatTime(new Date());

  try {
    if ( !(date instanceof Date) ) date = new Date(date);

  } catch (error) {
    return null;

  }

  if (!options) {
    options = {
      timeStyle: config.displaySeconds ? 'medium' : 'short',
      hour12: !config.militaryTime,
    };
  }

  return date.toLocaleTimeString(undefined, options);
}


function formatDate(date, options) {

  if (!date) return formatDate(new Date());

  try {
    if ( !(date instanceof Date) ) date = new Date(date);

  } catch (error) {
    return null;

  }

  return date.toLocaleDateString(undefined, options);


  // if (!format)
  //   return formatDate(date, dateFormats.short);
  //
  // const month = date.getMonth();
  // const day = date.getDate();
  // const year = date.getFullYear();
  //
  // switch(format) {
  //   case dateFormats.shortest:
  //     return `${month + 1}/${day}`;
  //   case dateFormats.short:
  //     return `${month + 1}/${day}/${year.toString().substring(year.length - 2)}`;
  //   case dateFormats.longerButStillShort:
  //     return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  //   case dateFormats.businessCasual:
  //     return `${monthNames[month].length <= 4 ? monthNames[month] : monthNames[month].substring(0, 3)} ${day}, ${year}`;
  //   case dateFormats.formal:
  //     return `${monthNames[month]} ${day}, ${year}`;
  //   default:
  //     return formatDate(date, dateFormats.short);
  // }
}

function isSameDate(d1, d2) {
  const dateOptions = { dateStyle: 'full' };
  const getDate = (date) => date.toLocaleDateString(undefined, dateOptions);

  if ( !(d1 && d2) ) return false;

  try {
    if ( !(d1 instanceof Date) ) d1 = new Date(d1);
    if ( !(d2 instanceof Date) ) d2 = new Date(d2);

  } catch (error) {
    return false;

  }

  return getDate(d1) === getDate(d2);
}

/**
 * Return true if date.getTime() falls within rangeStart (incl) and rangeEnd (excl)
*/
function dateWithinRange(date, rangeStart, rangeEnd) {

  try {
    if (!(date instanceof Date)) date = new Date(date);

    if (!(rangeStart instanceof Date)) rangeStart = new Date(rangeStart);
    if (!(rangeEnd instanceof Date)) rangeEnd = new Date(rangeEnd);

    return rangeStart.getTime() <= date.getTime() && date.getTime() < rangeEnd.getTime();
  } catch (err) {
    console.log(`error: `, date, rangeStart, rangeEnd);
    return false;
  }
}

/**
 * Finds and returns the date from the given date by adding (or substracting)
 * 12 hours at a time. Also sets the time to 11:59:01 pm
 *
 * This shouldn't be used if the numDays needs to be big.
 *
 * @param {Date} dateTime - the start date
 * @param {Number} numDays - the number of days from the given date. Can be
 * positive or negative.
*/
function addDays(dateTime, numDays) {
  if (numDays !== 0) {

    const halfDay = 1000 * 60 * 60 * 18 * Math.sign(numDays);

    if (numDays < 0) numDays *= -1;

    while (numDays > 0) {
      let day = dateTime.getDate();
      dateTime = new Date(dateTime.getTime() + halfDay);

      if (dateTime.getDate() !== day)
        --numDays;
    }
  }

  return normalizeDate(dateTime);
}

function normalizeDate(date) {
  if (!date) normalizeDate(new Date());

  try {
    if (!(date instanceof Date) ) date = new Date(date);
  } catch (error) {
    return null;

  }

  return new Date(Date.parse(`${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()}`));
}

export { dateFormats, formatTime, formatDate, isSameDate, dateWithinRange, addDays };
