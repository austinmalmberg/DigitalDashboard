## Introduction

A React web application that provides and easy-to-view interface for daily and weekly weather and events. This application uses the Google Calendar API for calendar events and the Dark Sky API for weather.

## Setup

Authorize this application to request calendar events on your behalf. Allow the page to use your location to view current weather conditions in your area.

### About the calendar

Pulls event from Google Calendar based on user settings in *src/config.js*.

By default, the application grabs events from the user's primary calendar. To use a different calendar, access the calendar's settings through Google Calendars. Under **Integrate calendar**, grab the Calendar ID and put it in the *src/config.js* file under `calendar.calendarId` (make sure it's in quotes).

Currently, only one calendar can by added. Use a shared calendar to display events from more than one person.

### About the weather

Weather is powered by the Dark Sky API.

Daily API calls are capped at 1,000 so I'm caching location weather data on the server for now.  For this reason, setting `weather.syncInterval` in the *src/config.js* file to anything less than 5 minutes will pull cached data.

Copyright (c) 2019 Austin Malmberg
