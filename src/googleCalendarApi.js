
import config from './config';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

function loadApiClient(signInListener) {
  window.gapi.load('client:auth2', async () => await initClient(signInListener));
}

async function initClient(signInListener) {
  await window.gapi.client.init({
    apiKey: config.API_KEY,
    clientId: config.CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {

    // change isAuthorized state when signed in status changes
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(signInListener);
    signInListener(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

async function loadCalendarEvents(maxSyncDate, eventsListener) {

  const response = await window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'timeMax': maxSyncDate.toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'orderBy': 'startTime'
  });

  eventsListener(response.result.items);
}

export { loadApiClient, loadCalendarEvents };
