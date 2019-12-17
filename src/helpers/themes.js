
const themes = {
  "rain": {
    main: {
      backgroundImage: "url('images/rain.jpg')",
    },
    clock: {
      color: "black",
    },
    header: {
      backgroundColor: "#2d3436",
      color: "#dfe6e9",
    },
    calendar: {
      backgroundColor: "#dfe6e9",
      color: "black",
    },
  },

  "clear-day": {
    main: {
      backgroundImage: "url('images/clear-day.jpg')",
    },
    clock: {
      color: "black",
    },
    header: {
      backgroundColor: "#4bcffa",
      color: "black",
    },
    calendar: {
      backgroundColor: "white",
      color: "black",
      borderColor: "#4bcffa",
    },
  },

  "clear-night": {
    main: {
      backgroundImage: "url('images/clear-night.jpg')",
    },
    clock: {
      color: "#d2dae2",
    },
    header: {
      backgroundColor: "#d2dae2",
      color: "#2C3A47",
    },
    calendar: {
      backgroundColor: "#2C3A47",
      color: "#d2dae2",
      borderColor: "#d2dae2",
    },
  },

  "partly-cloudy-day": {
    main: {
      backgroundImage: "url('images/partly-cloudy-day.jpg')",
    },
    clock: {
      color: "white",
    },
    header: {
      backgroundColor: "#0984e3",
      color: "white",
    },
    calendar: {
      backgroundColor: "white",
      color: "black",
      borderColor: "#0984e3",
    },
  },

  "partly-cloudy-night": {
    main: {
      backgroundImage: "url('images/partly-cloudy-night.jpg')",
    },
    clock: {
      color: "#B88430",
    },
    header: {
      backgroundColor: "black",
      color: "#B88430",
    },
    calendar: {
      backgroundColor: "#B88430",
      color: "black",
      borderColor: "black",
    },
  },

  "cloudy": {
    main: {
      backgroundImage: "url('images/cloudy.jpg')",
    },
    clock: {
      color: "black",
    },
    header: {
      backgroundColor: "#40739e",
      color: "black",
    },
    calendar: {
      backgroundColor: "white",
      color: "black",
      borderColor: "#40739e",
    },
  },

  "snow": {
    main: {
      backgroundImage: "url('images/snow.jpg')",
    },
    clock: {
      color: "white",
    },
    header: {
      backgroundColor: "#2980b9",
      color: "white",
    },
    calendar: {
      backgroundColor: "white",
      color: "black",
      borderColor: "#2980b9",
    },
  },

  "sleet": {
    main: {
      backgroundImage: "url('images/sleet.jpg')",
    },
    clock: {
      color: "white",
    },
    header: {
      backgroundColor: "#dfe6e9",
      color: "black",
    },
    calendar: {
      backgroundColor: "#2d3436",
      color: "#dfe6e9",
      borderColor: "#dfe6e9",
    },
  },

  "wind": {
    main: {
      backgroundImage: "url('images/wind.jpg')",
    },
    clock: {
      color: "#331800",
    },
    header: {
      backgroundColor: "#686B13",
      color: "#331800",
    },
    calendar: {
      backgroundColor: "white",
      color: "#331800",
      borderColor: "#686B13",
    },
  },

  "fog": {
    main: {
      backgroundImage: "url('images/fog.jpg')",
    },
    clock: {
      color: "#dfe6e9",
    },
    header: {
      backgroundColor: "#130f40",
      color: "#dfe6e9",
    },
    calendar: {
      backgroundColor: "#dfe6e9",
      color: "#130f40",
      borderColor: "#130f40",
    },
  },
};

function getTheme(name) {
  return themes[name];
}

export default getTheme;
