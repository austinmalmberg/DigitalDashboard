import config from '../config';

async function getCurrentWeather(callback) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  await fetch(`${baseUrl}?zip=${config.weather.zip_code},${config.weather.country}&appid=${config.openweathermap.API_KEY}`)
    .then(result => result.json())
    .then(callback);
}

function getForecast(callback) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  fetch(`${baseUrl}?zip=${config.weather.zip_code},${config.weather.country}&appid=${config.openweathermap.API_KEY}`)
    .then(result => result.json())
    .then(callback);
}

export { getCurrentWeather, getForecast };
