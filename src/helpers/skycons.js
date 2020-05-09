const Skycons = window.Skycons;

let skycons = new Skycons({ "color": "#dfe6e9"});

const skycon = {
    "clear-day": {
        icon: Skycons.CLEAR_DAY,
        color: "#ffa502",
    },
    "clear-night": {
        icon: Skycons.CLEAR_NIGHT,
        color: "#ffa502",
    },
    "partly-cloudy-day": {
        icon: Skycons.PARTLY_CLOUDY_DAY,
        color: "#57606f",
    },
    "partly-cloudy-night": {
        icon: Skycons.PARTLY_CLOUDY_NIGHT,
        color: "#2f3542",
    },
    "cloudy": {
        icon: Skycons.CLOUDY,
        color: "#57606f",
    },
    "rain": {
        icon: Skycons.RAIN,
        color: "#2f3542",
    },
    "sleet": {
        icon: Skycons.SLEET,
        color: "#57606f",
    },
    "snow": {
        icon: Skycons.SNOW,
        color: "#ffa502",
    },
    "wind": {
        icon: Skycons.WIND,
        color: "#ffa502",
    },
    "fog": {
        icon: Skycons.FOG,
        color: "#ffa502",
    },
}

function setColor(color) {
    if (skycons.color !== color) {
        skycons = new Skycons({ "color": color });
    }
}

function addSkyconToCanvas(canvas, description) {
    const { icon, color } = skycon[description] || skycon['wind'];

    setColor(color);

    skycons.set(canvas, icon);
    skycons.play();
}

export default addSkyconToCanvas;
