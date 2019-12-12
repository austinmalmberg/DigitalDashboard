
import { formatTime, isSameDate, getDayTimeParams } from './dateTime';

function getContextRemarks(date, dateRange) {

  const [ rangeStart, rangeEnd ] = dateRange;
  const [ dayStart, dayEnd ] = getDayTimeParams(date);
  const [ startingToday, endingToday ] = dateRange.map(d => isSameDate(date, d));

  if (startingToday && endingToday) {
    // just return the time if the event begins and ends the same day
    return [ formatTime(rangeStart), `-${formatTime(rangeEnd)}` ];
  }

  if (startingToday && rangeEnd.getTime() > dayEnd.getTime()) {
    return [ formatTime(rangeStart), null ];
  }

  if (endingToday && rangeStart.getTime() < dayStart.getTime()) {
    return [ null, `until ${formatTime(rangeEnd)}` ];
  }


  return [ null, null ];
}

export default getContextRemarks;
