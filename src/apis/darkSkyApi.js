
async function getDarkSkyWeather(location, callback) {

  const { latitude, longitude } = location;

  const response = await fetch(`/darksky`, {
    method: 'POST',
    body: JSON.stringify({ latitude, longitude }),
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
