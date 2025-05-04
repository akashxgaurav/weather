export const getWeatherIcon = (icon: number) => {
  const weatherIconURI = "https://www.meteosource.com/static/img/ico";

  switch (icon) {
    case 1:
      return `${weatherIconURI}/weather/1.svg`;
    case 2:
      return `${weatherIconURI}/weather/2.svg`;
    case 3:
      return `${weatherIconURI}/weather/3.svg`;
    case 4:
      return `${weatherIconURI}/weather/4.svg`;
    case 5:
      return `${weatherIconURI}/weather/5.svg`;
    case 6:
      return `${weatherIconURI}/weather/6.svg`;
    case 7:
      return `${weatherIconURI}/weather/7.svg`;
    case 8:
      return `${weatherIconURI}/weather/8.svg`;
    case 9:
      return `${weatherIconURI}/weather/9.svg`;
    case 10:
      return `${weatherIconURI}/weather/10.svg`;
    case 11:
      return `${weatherIconURI}/weather/11.svg`;
    case 12:
      return `${weatherIconURI}/weather/12.svg`;
    case 13:
      return `${weatherIconURI}/weather/13.svg`;
    case 14:
      return `${weatherIconURI}/weather/14.svg`;
    case 15:
      return `${weatherIconURI}/weather/15.svg`;
    case 16:
      return `${weatherIconURI}/weather/16.svg`;
    case 17:
      return `${weatherIconURI}/weather/17.svg`;
    case 18:
      return `${weatherIconURI}/weather/18.svg`;
    case 19:
      return `${weatherIconURI}/weather/19.svg`;
    case 20:
      return `${weatherIconURI}/weather/20.svg`;
    case 21:
      return `${weatherIconURI}/weather/21.svg`;
    case 22:
      return `${weatherIconURI}/weather/22.svg`;
    case 23:
      return `${weatherIconURI}/weather/23.svg`;
    case 24:
      return `${weatherIconURI}/weather/24.svg`;
    case 25:
      return `${weatherIconURI}/weather/25.svg`;
    case 26:
      return `${weatherIconURI}/weather/26.svg`;
    case 27:
      return `${weatherIconURI}/weather/27.svg`;
    case 28:
      return `${weatherIconURI}/weather/28.svg`;
    case 29:
      return `${weatherIconURI}/weather/29.svg`;
    case 30:
      return `${weatherIconURI}/weather/30.svg`;
    case 31:
      return `${weatherIconURI}/weather/31.svg`;
    case 32:
      return `${weatherIconURI}/weather/32.svg`;
    case 33:
      return `${weatherIconURI}/weather/33.svg`;
    case 34:
      return `${weatherIconURI}/weather/34.svg`;
    case 35:
      return `${weatherIconURI}/weather/35.svg`;
    default:
      return `${weatherIconURI}/weather/1.svg`;
  }
};

export const weatherTextSummary = {
  1: "Not available",
  2: "Sunny",
  3: "Mostly sunny",
  4: "Partly sunny",
  5: "Mostly cloudy",
  6: "Cloudy",
  7: "Overcast",
  8: "Overcast with low clouds",
  9: "Fog",
  10: "Light rain",
  11: "Rain",
  12: "Possible rain",
  13: "Rain shower",
  14: "Thunderstorm",
  15: "Local thunderstorms",
  16: "Light snow",
  17: "Snow",
  18: "Possible snow",
  19: "Snow shower",
  20: "Rain and snow",
  21: "Possible rain and snow",
  22: "Freezing rain",
  23: "Possible freezing rain",
  24: "Hail",
  25: "Clear (night)",
  26: "Mostly clear (night)",
  27: "Partly clear (night)",
  28: "Mostly cloudy (night)",
  29: "Cloudy (night)",
  30: "Overcast with low clouds (night)",
  31: "Rain shower (night)",
  32: "Local thunderstorms (night)",
  33: "Snow shower (night)",
  34: "Rain and snow (night)",
  35: "Possible freezing rain (night)",
};

