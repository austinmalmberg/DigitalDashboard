
const session_config = {
  militaryTime: false, // Default: false
  displaySeconds: false, // Default: false
  calendar: {
    calendarId: '5u6lidgv1kp59e0i007hmksd94@group.calendar.google.com', // Default: primary
    daysToSync: 7,  // days. Default: 7
  }
};

const endpoints = {
    WEATHER: '/darksky',
    GOOGLE_CALENDAR: '/calendar'
}

export { session_config, endpoints };
