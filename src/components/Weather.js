import React, { useState, useEffect, useRef } from 'react';

import setSkycon from '../helpers/skycons';

const Weather = ({ currentWeather, forecastData, compact }) => {

  const [ icon, setIcon ] = useState('');
  const canvas = useRef(null);

  useEffect(() => {
    if (forecastData && icon !== forecastData.icon) {
      setIcon(forecastData.icon);
      setSkycon(canvas.current, forecastData.icon);
    }
  }, [forecastData, icon]);

  const canvasDimensions = compact ? 75 : 150;

  if (!forecastData) {
    return (
      <div className="weather">
        <p>No weather data</p>
      </div>
    );
  }

  return (
    <div className="weather">
      <div className="temperatures">
        <p className="temp hi">Hi: { Math.round(forecastData.temperatureHigh) }</p>
        { currentWeather && <p className="temp current">{ Math.round(currentWeather.temperature) }</p> }
        <p className="temp lo">Lo: { Math.round(forecastData.temperatureLow) }</p>
      </div>
      <figure className="icon">
        <canvas ref={ canvas } className="weather--canvas" width={ canvasDimensions } height={ canvasDimensions }></canvas>
      </figure>
    </div>
  );
};

export default Weather;
