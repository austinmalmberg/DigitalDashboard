
const options = {
  timeout: 30000
};

function getLocation(callback, error) {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(pos => callback(pos.coords), error, options);
  }
}

export default getLocation;
