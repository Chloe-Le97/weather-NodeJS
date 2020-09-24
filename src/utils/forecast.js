const request = require("request");

// const url =
//   "http://api.weatherstack.com/current?access_key=e44d124ae1e1275b087c59b0841af86d&query=Helsinki";

// request({ url: url, json: true }, (error, response) => {
//   const currentData = response.body.current;
//   console.log(
//     `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degree out. It feels like ${currentData.feelslike} degree out`
//   );
// });

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e44d124ae1e1275b087c59b0841af86d&query=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const currentDataWeather = body.current;
      callback(
        undefined,
        `It is ${currentDataWeather.weather_descriptions[0]}. It is currently ${currentDataWeather.temperature} degree out. It feels like ${currentDataWeather.feelslike} degree out`
      );
    }
  });
};

module.exports = forecast;
