import React, { useState, useEffect } from 'react';

import config from '../config';

const WeatherHUD = ({ date, weather }) => {

  const { temp_max, temp, temp_min } = weather.main || null;

  return (
    <div className="temperatures">
      <p className="temp hi">Hi: { temp_max || 69 }</p>
      <p className="temp current">{ temp || 69 }</p>
      <p className="temp lo">Lo: { temp_min || 69 }</p>
    </div>
  );
};

export default WeatherHUD;
