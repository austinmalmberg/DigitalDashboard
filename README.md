## Introduction

A React web application that provides and easy-to-view interface for daily and weekly weather and events. This application uses the Google Calendar API for calendar events and the Dark Sky API for weather.

## Setup

Authorize this application to request calendar events on your behalf. Allow the page to use your location to view current weather conditions in your area.

### About the calendar

Currently, only one calendar can by added. Use a shared calendar to display events from more than one person.

By default, the application grabs events from the user's primary calendar. To use a different calendar, access the calendar's settings through Google Calendars. Under **Integrate calendar**, grab the Calendar ID and put it in the *src/config.js* file under `calendar.calendarId` (make sure it's in quotes).

### About the Weather

Due to caps on (free) Dark Sky API calls, I'm caching location weather data on the server for now.  For this reason, setting `weather.syncInterval` in the *src/config.js* file to anything less than 5 minutes will pull cached data.
