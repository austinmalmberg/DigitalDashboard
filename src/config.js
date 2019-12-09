
export default {
  default_location: {   // used by geolocation
    latitude: 35.501,
    longitude: -81.004
  },

  clock: {
    militaryTime: false
  },

  calendar: {
    calendarId: 'primary',  // couples calendar id = 5u6lidgv1kp59e0i007hmksd94@group.calendar.google.com
    daysToSync: 7,  // styling done for <= 7 days ( 6 secondary days )
    syncInterval: 60 // in seconds, used to make api calls
  },

  weather: {
    units: 'imperial',  // imperial, metric, kelvin
    syncInterval: 1, // in minutes, used to make api calls
    cacheAge: 20 // in minutes
  }
};
