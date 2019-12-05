
import config from '../config';

// dark sky does not allow cross-site origin requests

function getDarkSkyWeather(callback) {
  fetch(`/darkskyapi/${config.weather.cacheAge}`, {
    method: 'POST',
    body: JSON.stringify(config.weather.location),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(callback);
}

export { getDarkSkyWeather };
