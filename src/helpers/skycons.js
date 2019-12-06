const Skycons = window.Skycons;

const skycons = new Skycons({ "color": "black"});

const skycon = {
  "clear-day": Skycons.CLEAR_DAY,
  "clear-night": Skycons.CLEAR_NIGHT,
  "partly-cloudy-day": Skycons.PARTLY_CLOUDY_DAY,
  "partly-cloudy-night": Skycons.PARTLY_CLOUDY_NIGHT,
  "cloudy": Skycons.CLOUDY,
  "rain": Skycons.RAIN,
  "sleet": Skycons.SLEET,
  "snow": Skycons.SNOW,
  "wind": Skycons.WIND,
  "fog": Skycons.FOG
}

const def = Skycons.WIND;

function setSkycon(element, description) {
  skycons.set(element, skycon[description] || def);
  skycons.play();
}

export default setSkycon;
