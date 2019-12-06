
import config from '../config';

// dark sky does not allow cross-site origin requests

async function getDarkSkyWeather(callback) {
  const response = await fetch(`/darkskyapi/${config.weather.cacheAge}`, {
    method: 'POST',
    body: JSON.stringify(config.weather.location),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (callback)
    callback(data);
  else {
    return data;
  }
}

export { getDarkSkyWeather };
