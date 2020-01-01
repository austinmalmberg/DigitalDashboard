## Introduction

A React web application that provides and easy-to-view interface for daily and weekly weather and events. This application uses the Google Calendar API for calendar events and the Dark Sky API for weather.

## Setup

Authorize the application to request calendar events on your behalf. Allow the page to use your location to view current weather conditions in your area.

### About the calendar

Pulls event from Google Calendar based on user settings in *src/config.js*.

By default, the application grabs events from the user's primary calendar. To use a different calendar, access the calendar's settings through Google Calendars. Under *Integrate calendar*, grab the Calendar ID and put it in the *src/config.js* file under `calendar.calendarId` (make sure it's in quotes).

Currently, only one calendar can by added. Use a shared calendar to display events contributed by more than one person.

#### Tags

Tags can be added to calendar events and are handy when adding events on someone else's behalf or adding custom styled tags to events. This is displayed as a tag before the event title.

To add a tag, enter a word in brackets in the event title. For example, "A cool event [Austin]". By default, these tags will have a white background with black text. To add custom colors, modify the *src/config.js* file and add an object similar to the one below in the `calendar.contributors` array:

    {
      email: 'test@email.com', *The email address of one of the contributors. **Optional***
      displayText: 'Austin', *The text displayed on the tag. **Required***
      style: { *Any custom styling. **Optional***
        color: 'white',
        backgroundColor: '#FF524B',
      }
    }

Once the object is added, it can then be referenced by adding [*index*] to the event title instead of using a string. For example, "Another cool event [0]". This can also be useful if you want to categorize events with custom colors.

### About the weather

Weather is powered by the Dark Sky API. (Free) daily API calls are capped at 1,000 so I'm caching location weather data on the server for now.

## Acknowledgements

### Background images

  - **Clear Day** by Alexey Ruban, https://unsplash.com/photos/MmhZBm5ThbU
  - **Clear Night** by Noah Silliman, https://unsplash.com/photos/Bu2-LpaD0kU
  - **Cloudy** by Daria Nepriakhina, https://unsplash.com/photos/auMjWDfTFhI
  - **Fog** by Nathan Anderson, https://unsplash.com/photos/v1pu3WSFieE
  - **Partly Cloudy Day** by Ian Baldwin, https://unsplash.com/photos/UA1UN-r9E5Y
  - **Partly Cloudy Night** by Fezbot2000, https://unsplash.com/photos/g3QBQto9Jt0
  - **Rain** by Gabriele Diwald, https://unsplash.com/photos/Kwi60PbAM9I
  - **Sleet** by Lola Guti, https://unsplash.com/photos/T7RlFC8dH60
  - **Snow** by Chandler Cruttenden, https://unsplash.com/photos/w8hWTFpGtpY
  - **Wind** by Stanislav Kondratiev, https://unsplash.com/photos/MqkwG8aKpg8





Copyright (c) 2019 Austin Malmberg
