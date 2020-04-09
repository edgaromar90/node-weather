const request = require('request')
const token = 'pk.eyJ1IjoiZWRnYXJvbWFyOTAiLCJhIjoiY2s4bTM3bDV4MGF0ajNmcGVnMWszNWdpdyJ9.nsV67MpEWd9UFVWgJhfGng'

const getGeocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const { center, place_name } = response.body.features[0]

      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      })
    }
  })
}

module.exports = getGeocode