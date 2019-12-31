
const config = {
  militaryTime: false, // Default: false
  displaySeconds: false, // Default: false
  calendar: {
    calendarId: '5u6lidgv1kp59e0i007hmksd94@group.calendar.google.com', // Default: primary
    daysToSync: 7,  // days. Default: 7
    contributors: [
      {
        email: 'austin.malmberg@gmail.com',
        displayName: 'Austin',
        style: {
          color: 'white',
          backgroundColor: '#FF524B' // reddish
        }
      },
      {
        email: 'ams91592@gmail.com',
        displayName: 'Annie',
        style: {
          color: 'white',
          backgroundColor: '#2ED95B' // green
        }
      }
    ]
  }
};

export default config;
