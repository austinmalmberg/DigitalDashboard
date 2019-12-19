
async function getWeather(location, callback, onError) {

  const { latitude, longitude } = location;

  console.log(`Fetching weather data`);

  const response = await fetch(`/darksky`, {
    method: 'POST',
    body: JSON.stringify({ latitude, longitude }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  let data;
  if (response.status === 200) {
    data = await response.json();

    if (callback) {
      callback(data);
    } else {
      return data;
    }

  } else {

    if (onError) {
      onError(response);
    } else {
      return null;
    }
  }
}

export default getWeather;
