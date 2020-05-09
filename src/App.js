import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import Authorization from './components/Authorization';
import DailySnapshot from './components/DailySnapshot';

import getWeather from './apis/weatherApi';
import { defaultTheme } from './helpers/themes';
import { loadApiClient, loadCalendarEvents, getEventColors } from './apis/googleCalendarApi';

import { session_config } from './config';
import { addDays, getStartingDateTime } from './helpers/dateTime';

const App = () => {

    // updates daily via the Clock component
    const [ date, setDate ] = useState(getStartingDateTime(new Date()));

    const [ signedIn, setSignedIn ] = useState(false);
    const [ events, setEvents ] = useState([]);
    const [ eventColors, setEventColors] = useState({});

    const [ weatherData, setWeatherData ] = useState(null);
    const [ theme, setTheme ] = useState(defaultTheme());

    // onload, get calendar events and weather
    useEffect(() => {
        // updates authorization state when google calendar api is loaded
        loadApiClient(setSignedIn);
    }, []);

    useEffect(() => {
        let weatherId;

        const updateWeather = async () => {
            await getWeather(setWeatherData, (err) => {
                console.log(`Unable to retrieve weather\n${err.status} ${err.statusText}`);
            });
        };

        updateWeather();

        // schedule periodic weather updates
        weatherId = setInterval(updateWeather, process.env.WEATHER_SYNC_INTERVAL || 6 * 60 * 1000);

        return () => {
            if (weatherId) clearInterval(weatherId);
        };
    }, [date]);

    // listen for Google OAUTH sign in
    useEffect(() => {
        let intervalId;

        if (signedIn) {
            getEventColors(setEventColors);

            // load calendar events
            loadCalendarEvents(setEvents);
            intervalId = setInterval(() => loadCalendarEvents(setEvents), process.env.CALENDAR_SYNC_INTERVAL || 5 * 60 * 1000);
        }

        // clean up interval
        return () => {
            if (intervalId) clearInterval(intervalId);
        }
    }, [signedIn]);


    if (!signedIn) {
        return (
            <div className="text-center">
            <Clock appDate={ date } setAppDate={ setDate } />
            <Authorization signedIn={ signedIn } />
            </div>
        );
    }

    return (
        <main style={ theme && theme.main }>
        <div className="left">

        <Clock appDate={ date } setAppDate={ setDate } theme={ theme } />

        <DailySnapshot
        forDate={ date }
        events={ events }
        eventColors={ eventColors }
        weatherData={ weatherData }
        theme={ theme }
        setTheme={ setTheme }
        />

        </div>

        <div className="right">

        {/* map numbers from 0 - daysToSync to their respective date then create SecondaryEvent components from these dates */}
        { [...Array(session_config.calendar.daysToSync - 1).keys()].map(i => [addDays(date, i + 1), i]).map(([futureDate, i], key) => (
            <DailySnapshot
            key={ key }
            forDate={ futureDate }
            events={ events }
            eventColors={ eventColors }
            weatherData={ weatherData }
            theme={ theme }
            />
        ))}

        </div>
        </main>
    );
};

export default App;
