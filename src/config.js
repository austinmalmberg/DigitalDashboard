
export default {
  general: {

  },

  clock: {
    militaryTime: false
  },

  calendar: {
    calendarId: '5u6lidgv1kp59e0i007hmksd94@group.calendar.google.com',
    daysToSync: 7,  // styling done for <= 7 days ( 6 secondary days )
    syncInterval: 60 // in seconds, used to make api calls
  },

  weather: {
    units: 'imperial',  // imperial, metric, kelvin
    zip_code: '28037',  // used by open weather
    location: {   // used by dark sky
      lat: 35.501,
      long: -81.004
    },
    country: 'us',  // used by dark sky
    syncInterval: 0.1, // in minutes, used to make api calls
    cacheAge: 20 // in minutes
  }
};
