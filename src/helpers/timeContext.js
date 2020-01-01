
import { formatTime, isSameDate, getDayTimeParams } from './dateTime';

function getContextRemarks(date, dateRange) {

  const [ rangeStart, rangeEnd ] = dateRange;
  const [ dayStart, dayEnd ] = getDayTimeParams(date);
  const [ startingToday, endingToday ] = dateRange.map(d => isSameDate(date, d));

  // the event begins and ends the same day
  if (startingToday && endingToday) {
    return [ formatTime(rangeStart), `- ${formatTime(rangeEnd)}` ];
  }

  // the event ends on a different day
  if (startingToday && rangeEnd.getTime() > dayEnd.getTime()) {
    return [ formatTime(rangeStart), null ];
  }

  // the event begins on a previous day
  if (endingToday && rangeStart.getTime() < dayStart.getTime()) {
    return [ null, `'til ${formatTime(rangeEnd)}` ];
  }

  return [ null, null ];
}

export default getContextRemarks;
