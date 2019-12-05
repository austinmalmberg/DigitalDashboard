import React from 'react';

const Weather = ({ weather }) => {

  return (
    <div className="weather">
      <div className="temperatures">
        { weather.max && <p className="temp hi">Hi: { Math.round(weather.max) }</p> }
        { weather.current && <p className="temp current">{ Math.round(weather.current) }</p> }
        { weather.min && <p className="temp lo">Lo: { Math.round(weather.min) }</p> }
      </div>
      { weather.image_src && <img src={ weather.image_src } alt="weather-icon" /> }
    </div>
  );
};

export default Weather;
