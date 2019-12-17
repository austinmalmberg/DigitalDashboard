import React, { useState, useEffect, useRef } from 'react';

import { setSkycon, setColor } from '../helpers/skycons';

import getTheme from '../helpers/themes';

const Weather = ({ weather, theme, setTheme, compact }) => {

  const [ current, setCurrent ] = useState(null);
  const [ forecast, setForecast ] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    if (weather) {
      setCurrent(weather.currently);
      setForecast(weather.forecast);
    }
  }, [weather]);

  useEffect(() => {

    if (current && setTheme) {
      const newtheme = getTheme(current.icon);
      console.log(`Changing theme to ${current.icon}`);

      // change skycon color
      setColor(newtheme.header.color);

      setSkycon(canvas.current, current.icon);

      // tell App.js to update the theme
      setTheme(newtheme);
    }

  }, [current, setTheme]);

  useEffect(() => {
    if (forecast) {
      setSkycon(canvas.current, forecast.icon);
    }
  }, [forecast]);

  const canvasDimensions = compact ? 60 : 150;

  if (!weather) {
    return (
      <div className="weather">
        <p>No weather data</p>
      </div>
    );
  }

  return (
    <div className="weather">
      <div className="temperatures">
        { forecast && <p className="temp hi">Hi: { Math.round(forecast.temperatureMax) }</p> }
        { current && <p className="temp current">{ Math.round(current.temperature) }</p> }
        { forecast && <p className="temp lo">Lo: { Math.round(forecast.temperatureMin) }</p> }
      </div>
      <figure className="icon">
        <canvas ref={ canvas } className="weather--canvas" width={ canvasDimensions } height={ canvasDimensions }></canvas>
      </figure>
    </div>
  );
};

export default Weather;
