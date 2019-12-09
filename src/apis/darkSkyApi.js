
async function getWeather(location, callback, error) {

  const { latitude, longitude } = location;

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
  }

  if (callback) {
    callback(data);
  } else {
    return data;
  }
}

export default getWeather;
