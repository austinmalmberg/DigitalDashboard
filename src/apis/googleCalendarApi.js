
import config from '../config';

import { addDays, getStartingDateTime } from '../helpers/dateTime';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const gapi = window.gapi;

function loadApiClient(signInListener) {
  gapi.load('client:auth2', () => initClient(signInListener));
}

async function initClient(signInListener) {
  await gapi.client.init({
    apiKey: process.env.GOOGLE_CALENDAR_API_KEY,
    clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {

    // change isAuthorized state when signed in status changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(signInListener);
    signInListener(gapi.auth2.getAuthInstance().isSignedIn.get());

  }).catch((err) => console.log('Could not retrieve calendar data', err));
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

async function loadCalendarEvents(eventsListener) {
  const now = new Date();

  const response = await gapi.client.calendar.events.list({
    'calendarId': config.calendar.calendarId || 'primary',
    'timeMin': (getStartingDateTime(now)).toISOString(),
    'timeMax': (addDays(now, config.calendar.daysToSync || 7)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'orderBy': 'startTime'
  });

  eventsListener(response.result.items);
}

async function getEventColors(colorListener) {
  const response = await gapi.client.calendar.colors.get();

  colorListener(response.result.event);
}

export { loadApiClient, loadCalendarEvents, getEventColors, signIn, signOut };
