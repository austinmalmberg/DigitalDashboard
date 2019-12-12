import React, { useState, useEffect, useRef } from 'react';

import setSkycon from '../helpers/skycons';

const Weather = ({ weather, compact }) => {

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

    if (current) {
      setSkycon(canvas.current, current.icon);
    } else if (forecast) {
      setSkycon(canvas.current, forecast.icon);
    }

  }, [current, forecast]);

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
        { forecast && <p className="temp hi">Hi: { Math.round(forecast.temperatureHigh) }</p> }
        { current && <p className="temp current">{ Math.round(current.temperature) }</p> }
        { forecast && <p className="temp lo">Lo: { Math.round(forecast.temperatureLow) }</p> }
      </div>
      <figure className="icon">
        <canvas ref={ canvas } className="weather--canvas" width={ canvasDimensions } height={ canvasDimensions }></canvas>
      </figure>
    </div>
  );
};

export default Weather;
