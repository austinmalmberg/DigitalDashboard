import config from '../config';

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const params = {
  zip: `${config.weather.zip_code},${config.weather.country}`,
  appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
  units: config.weather.units,
};
const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');

function getCurrentWeather(callback) {

  const path = '/weather';

  const imageUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  fetch(`${baseUrl}${path}?${query}`)
    .then(response => response.json())
    .then(data => {
      const formatted = {
        description: data.weather[0].description,
        image_src: imageUrl(data.weather[0].icon),
        temp: {
          min: data.main.temp_min,
          current: data.main.temp,
          max: data.main.temp_max
        }
      };
      callback(formatted);
    });
}

function getForecast(callback) {
  const path = '/forecast';

  fetch(`${baseUrl}${path}?${query}`)
    .then(response => response.json())
    .then(callback);
}

export { getCurrentWeather, getForecast };
