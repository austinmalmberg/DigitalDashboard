import React, { useState, useEffect } from 'react';

import { isSameDate, getDayTimeParams, rangesOverlap } from '../helpers/dateTime';

import Header from './Header';
import EventList from './EventList';

const DailySnapshot = ({ forDate, events, weatherData, theme, setTheme }) => {

  const [ isToday, setIsToday ] = useState(false);
  const [ weather, setWeather ] = useState({});
  const [ dailyEvents, setDailyEvents ] = useState([]);

  useEffect(() => {
    setIsToday(isSameDate(forDate, new Date()));
  }, [forDate])

  useEffect(() => {
    if (weatherData) {
      setWeather({
        currently: isSameDate(forDate, weatherData.currently.time * 1000) ? weatherData.currently : null,
        forecast: weatherData.daily.data.find(day => isSameDate(forDate, new Date(day.time * 1000)))
      });
    } else {
      setWeather(null);
    }
  }, [forDate, weatherData]);

  useEffect(() => {
    const timeRange = getDayTimeParams(forDate);

    const happeningToday = events.filter(event => {
      const start = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
      const end = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

      return rangesOverlap([start, end], timeRange);
    });

    setDailyEvents(happeningToday);
  }, [forDate, events, isToday]);

  return (
    <div style={ theme && theme.calendar } className={ "calendar--day "+ (isToday ? "primary" : "secondary") }>
      <Header date={ forDate } weather={ weather } theme={ theme } setTheme={ setTheme } compact={ !isToday } />
      <EventList events={ dailyEvents } forDate={ forDate } compact={ !isToday } />
    </div>
  );
};

export default DailySnapshot;
