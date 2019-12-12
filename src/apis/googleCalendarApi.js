
import config from '../config';

import { addDays } from '../helpers/dateTime';

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
  }).catch(console.log);
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

async function loadCalendarEvents(eventsListener) {

  const response = await gapi.client.calendar.events.list({
    'calendarId': config.calendar.calendarId,
    'timeMin': (new Date()).toISOString(),
    'timeMax': (addDays(new Date(), config.calendar.daysToSync)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'orderBy': 'startTime'
  });

  eventsListener(response.result.items);
}

export { loadApiClient, loadCalendarEvents, signIn, signOut };
