import React from 'react';

const Weather = ({ currentWeather, forecastData }) => {

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
    </div>
  );
};

export default Weather;
