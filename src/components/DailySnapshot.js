import React, { useState, useEffect } from 'react';

import { isSameDate, getDayTimeParams, rangesOverlap } from '../helpers/dateTime';

import Header from './Header';
import EventList from './EventList';

const DailySnapshot = ({ forDate, events, eventColors, weatherData, theme, setTheme }) => {

    const [ isToday, setIsToday ] = useState(false);
    const [ weather, setWeather ] = useState({ currently: null, forecast: null });
    const [ dailyEvents, setDailyEvents ] = useState([]);

    useEffect(() => {
        setIsToday(isSameDate(forDate, new Date()));
    }, [forDate])

    useEffect(() => {
        if (weatherData) {
            const forecast = weatherData.daily.data.find(day => isSameDate(forDate, new Date(day.time * 1000)));
            let currently;
            if (isSameDate(forDate, weatherData.currently.time * 1000))
            currently = weatherData.currently;

            setWeather({ forecast, currently });
        }
    }, [forDate, weatherData]);

    useEffect(() => {
        const timeRange = getDayTimeParams(forDate);

        const happeningToday = events.filter(event => {
            const start = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
            const end = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

            // subtract 1 second from the end to prevent all-day events from showing up the next day
            // i.e. an all-day event will go from today @ 12:00 AM until tomorrow @ 12:00 AM. But we
            // don't want the event showing up tomorrow
            const end_noOverlap = new Date(end.getTime() - 1000);

            return rangesOverlap([start, end_noOverlap], timeRange);
        });

        setDailyEvents(happeningToday);
    }, [forDate, events, isToday]);

    return (
        <div style={ theme && theme.calendar } className={ "calendar--day "+ (isToday ? "primary" : "secondary") }>
        <Header date={ forDate } weather={ weather } theme={ theme } setTheme={ setTheme } compact={ !isToday } />
        <EventList events={ dailyEvents } eventColors={ eventColors } forDate={ forDate } compact={ !isToday } />
        </div>
    );
};

export default DailySnapshot;
