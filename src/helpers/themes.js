
const themes = {
  "rain": {
    name: "rain",
    main: {
      backgroundColor: "#c5dae5",
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
    name: "clear-day",
    main: {
      backgroundColor: "#ffdeb0",
      backgroundImage: "url('images/clear-day.jpg')",
    },
    clock: {
      color: "black",
    },
    header: {
      backgroundColor: "#578FB3",
      color: "black",
    },
    calendar: {
      backgroundColor: "white",
      color: "black",
      borderColor: "#578FB3",
    },
  },

  "clear-night": {
    name: "clear-night",
    main: {
      backgroundColor: "#081426",
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
    name: "partly-cloudy-day",
    main: {
      backgroundColor: "#03509c",
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
    name: "partly-cloudy-night",
    main: {
      backgroundColor: "#0d0906",
      backgroundImage: "url('images/partly-cloudy-night.jpg')",
    },
    clock: {
      color: "#E3B271",
    },
    header: {
      backgroundColor: "black",
      color: "#E3B271",
    },
    calendar: {
      backgroundColor: "#E3B271",
      color: "black",
      borderColor: "black",
    },
  },

  "cloudy": {
    name: "cloudy",
    main: {
      backgroundColor: "#97a3b9",
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
    name: "snow",
    main: {
      backgroundColor: "#84b8de",
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
    name: "sleet",
    main: {
      backgroundColor: "#3f3f3f",
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
    name: "wind",
    main: {
      backgroundColor: "#f9f6f1",
      backgroundImage: "url('images/wind.jpg')",
    },
    clock: {
      color: "#331800",
    },
    header: {
      backgroundColor: "#d0ba86",
      color: "#331800",
    },
    calendar: {
      backgroundColor: "white",
      color: "#331800",
      borderColor: "#d0ba86",
    },
  },

  "fog": {
    name: "fog",
    main: {
      backgroundColor: "#8895a6",
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
