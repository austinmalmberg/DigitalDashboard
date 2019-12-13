## Introduction

A React web application that provides and easy-to-view interface for daily and weekly weather and events. This application uses the Google Calendar API for calendar events and the Dark Sky API for weather.

## Setup

Authorize the application to request calendar events on your behalf. Allow the page to use your location to view current weather conditions in your area.

#### About the calendar

Pulls event from Google Calendar based on user settings in *src/config.js*.

By default, the application grabs events from the user's primary calendar. To use a different calendar, access the calendar's settings through Google Calendars. Under *Integrate calendar*, grab the Calendar ID and put it in the *src/config.js* file under `calendar.calendarId` (make sure it's in quotes).

Currently, only one calendar can by added. Use a shared calendar to display events contributed by more than one person.

#### About the weather

Weather is powered by the Dark Sky API. (Free) daily API calls are capped at 1,000 so I'm caching location weather data on the server for now.

## Acknowledgements

### Background images

  - **Clear Day** by Kent Pilcher, https://unsplash.com/photos/87MIF4vqHWg
  - **Clear Night** by Noah Silliman, https://unsplash.com/photos/Bu2-LpaD0kU
  - **Cloudy** by Zbynek Burival, https://unsplash.com/photos/8iZG31eXkks
  - **Fog** by Nathan Anderson, https://unsplash.com/photos/v1pu3WSFieE
  - **Partly Cloudy Day** by Ian Baldwin, https://unsplash.com/photos/UA1UN-r9E5Y
  - **Partly Cloudy Night** by Fezbot2000, https://unsplash.com/photos/g3QBQto9Jt0
  - **Rain** by Gabriele Diwald, https://unsplash.com/photos/Kwi60PbAM9I
  - **Sleet** by Lola Guti, https://unsplash.com/photos/T7RlFC8dH60
  - **Snow** by Chandler Cruttenden, https://unsplash.com/photos/w8hWTFpGtpY
  - **Wind** by Stanislav Kondratiev, https://unsplash.com/photos/MqkwG8aKpg8





Copyright (c) 2019 Austin Malmberg
