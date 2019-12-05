import React from 'react';

import { kConverter } from '../helpers/temperatures';

const WeatherHUD = ({ date, weather }) => {

  if (!weather || !weather.main ) {
    return (
      <div className="temperatures">
        <p className="temp hi">Hi: { 69 }</p>
        <p className="temp current">{ 69 }</p>
        <p className="temp lo">Lo: { 69 }</p>
      </div>
    );
  }

  return (
    <div className="temperatures">
      <p className="temp hi">Hi: { kConverter(weather.main.temp_max) }</p>
      <p className="temp current">{ kConverter(weather.main.temp) }</p>
      <p className="temp lo">Lo: { kConverter(weather.main.temp_min) }</p>
    </div>
  );
};

export default WeatherHUD;
