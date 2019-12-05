
export default {
  google_calendar: {
    CLIENT_ID: null,  // ENTER OAUTH CLIENT ID HERE
    API_KEY: null,  // ENTER API KEY HERE
  },

  openweathermap: {
    API_KEY: null
  },

  general: {

  },

  clock: {
    militaryTime: false
  },

  calendar: {
    calendarId: null,
    daysToSync: 7,  // styling done for <= 7 days ( 6 secondary days )
    syncInterval: 60 // in seconds
  },

  weather: {
    units: 'imperial',  // imperial or metric
    zip_code: '28037',
    country: 'us',
    syncInterval: 60 * 30 // in seconds
  }
};
