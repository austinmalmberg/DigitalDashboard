
import config from '../config';

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
      timeStyle: 'short',
      hour12: !config.militaryTime,
    };
  } else if (!options.hour12) {
    options.hour12 = !config.militaryTime;
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
}

function isSameDate(d1, d2) {
  if ( !(d1 && d2) ) return false;

  try {
    if ( !(d1 instanceof Date) ) d1 = new Date(d1);
    if ( !(d2 instanceof Date) ) d2 = new Date(d2);

  } catch (error) {
    return false;

  }

  return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}

/**
 * Return true if date.getTime() falls within rangeStart (incl) and rangeEnd (excl)
*/
function dateWithinRange(date, [rangeStart, rangeEnd]) {

  try {
    if (!(date instanceof Date)) date = new Date(date);

    if (!(rangeStart instanceof Date)) rangeStart = new Date(rangeStart);
    if (!(rangeEnd instanceof Date)) rangeEnd = new Date(rangeEnd);

    return rangeStart.getTime() <= date.getTime() && date.getTime() < rangeEnd.getTime();

  } catch (err) {
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

// returns
function normalizeDate(date) {
  if (!date) normalizeDate(new Date());

  try {
    if (!(date instanceof Date) ) date = new Date(date);
  } catch (error) {
    return null;

  }

  return new Date(`${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()}`);
}

// returns an object with start and end times of given a date
// start is the date at 12:00 AM (0:00)
// end is the date at 11:59:59 PM (23:59:59)
function getDayTimeParams(date) {
  if (!date) return getDayTimeParams(new Date());

  const start = normalizeDate(date);
  const end = new Date(addDays(start, 1).getTime() - 1000);

  return [ start, end ];
}

function rangesOverlap(a, b) {
    const [aStart, aEnd] = a.map(d => d.getTime());
    const [bStart, bEnd] = b.map(d => d.getTime());

    return (bStart <= aStart && aStart <= bEnd) ||
        (bStart <= aEnd && aEnd <= bEnd) ||
        (aStart <= bStart && bStart <= aEnd);
}

export { formatTime, formatDate, isSameDate, dateWithinRange, addDays, normalizeDate, getDayTimeParams, rangesOverlap };
