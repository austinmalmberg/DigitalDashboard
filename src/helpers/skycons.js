const Skycons = window.Skycons;

let skycons = new Skycons({ "color": "#dfe6e9"});

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

// default
const def = Skycons.WIND;

function setColor(color) {

  if (skycons.color !== color) {
    skycons = new Skycons({ "color": color });
  }
}

function setSkycon(element, description) {
  skycons.set(element, skycon[description] || def);
  skycons.play();
}

export { setSkycon, setColor };
