const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=b2174d9e33e07fe75434ad3b07c330d5&query=' +
    lattitude +
    ',' +
    longitude;

  request({ url, json: true }, function (error, response, body) {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location, use different search term', undefined);
    } else {
      const { temperature, feelslike } = body.current;

      const summary =
        body.current.weather_descriptions[0] +
        '. It is currently ' +
        temperature +
        ' degrees out. It feels like ' +
        feelslike +
        ' degrees out.';

      callback(undefined, summary);
    }
  });
};

module.exports = forecast;

// const url =
//   'http://api.weatherstack.com/current?access_key=b2174d9e33e07fe75434ad3b07c330d5&query=37.8267,-122.4233';

// request({ url: url, json: true }, function (error, response, body) {
//   if (error) {
//     console.log('Unable to connect to weather service');
//   } else if (body.error) {
//     console.log('Unable to find location');
//   } else {
//     const { temperature, feelslike } = body.current;
//     console.log(
//       body.current.weather_descriptions[0] +
//         '. It is currently ' +
//         temperature +
//         ' degrees out. It feels like ' +
//         feelslike +
//         ' degrees out.'
//     );
//   }
// });
