import React, { useState, useEffect, useRef } from 'react';

import addSkyconToCanvas from '../helpers/skycons';

import getTheme from '../helpers/themes';

const Weather = ({ weather, setTheme, compact }) => {

  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ forecast, setForecast ] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    if (weather) {
      setCurrentWeather(weather.currently);
      setForecast(weather.forecast);
    }
  }, [weather]);

  useEffect(() => {

    if (currentWeather && setTheme) {
      const theme = getTheme(currentWeather.icon);
      addSkyconToCanvas(canvas.current, currentWeather.icon);
      setTheme(theme);

    } else if (forecast) {
      addSkyconToCanvas(canvas.current, forecast.icon);

    }

  }, [currentWeather, forecast, setTheme]);

  const canvasDimensions = compact ? 60 : 150;

  if (!currentWeather && !forecast) {
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
        { currentWeather && <p className="temp current">{ Math.round(currentWeather.temperature) }</p> }
        { forecast && <p className="temp lo">Lo: { Math.round(forecast.temperatureMin) }</p> }
      </div>
      <figure className="icon">
        <canvas ref={ canvas } className="weather--canvas" width={ canvasDimensions } height={ canvasDimensions }></canvas>
      </figure>
    </div>
  );
};

export default Weather;
