
export default {
  clock: {
    militaryTime: false,
    displaySeconds: false
  },

  calendar: {
    calendarId: 'primary',  // couples calendar id = 5u6lidgv1kp59e0i007hmksd94@group.calendar.google.com
    daysToSync: 7,  // styling done for <= 7 days ( 6 secondary days )
    syncInterval: 60 // in seconds, used to make api calls
  },

  weather: {
    units: 'imperial',  // imperial, metric, kelvin
    syncInterval: 5, // in minutes, used to make api calls
    cacheAge: 5 // in minutes
  }
};
