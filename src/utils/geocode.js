const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoia2lzaG9yZWE4MyIsImEiOiJjbDNyOWRvMzgwazJmM3Jxb2Zkejl1dG95In0.UPGbBGSNzsvCNWRzPr4svw&limit=1';

  request({ url, json: true }, function (error, response, body) {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length == 0) {
      callback('Unable to find location');
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
