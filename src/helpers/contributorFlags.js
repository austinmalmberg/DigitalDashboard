
import config from '../config';

/**
 * Returns the person responsible for the event. This is determined by the
 * following conditions in the following order:
 *
 * 1. Check the event summary for the first occurrence of brackets
 *   a. If it's a number, get the contributor at that index from the config file
 *   b. Otherwise, return a generic contributor with the displayName set to the
 *      value of the string
 * 2.
 *
 * NOTE: Including brackets with a number outside of the range of the contributor
 * array will return 'undefined'. This is intentional when you do not want to
 * specify a single contributor. To guarantee a contributor is not set, use [-1]
 * in the event summary.
 *
 * @event {Google Calendar Event} - the calendar event
*/
function getAssignee (event) {
  const re = /\s*\[.+\]\s*/g;

  const matches = event.summary.match(re);

  if (matches) {

    const match = matches[0];
    event.summary = event.summary.replace(match, ' ').trim();

    const trimmed = match.trim();
    const assignee = trimmed.substring(1, trimmed.length - 1);

    // return a generic contributor with the assignee set to the substring
    if (isNaN(assignee)) {
      return { displayName: assignee };
    }

    // if assignee is a number, get the contributor at that index
    return config.calendar.contributors[assignee];
  }

  return config.calendar.contributors.find(contributor => contributor.email === event.creator.email);
}

export default getAssignee;
