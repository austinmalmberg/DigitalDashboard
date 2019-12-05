import React from 'react';

const Weather = ({ weather }) => {

  const { min, max, current } = weather.temp;

  return (
    <div className="weather">
      <div className="temperatures">
        <p className="temp hi">Hi: { Math.round(max) }</p>
        { current && <p className="temp current">{ Math.round(current) }</p> }
        <p className="temp lo">Lo: { Math.round(min) }</p>
      </div>
      { weather.image_src && <img src={ weather.image_src } alt="weather" /> }
    </div>
  );
};

export default Weather;
