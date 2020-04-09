const request = require('request')
const apiKey = '994787f3bc57e108d39f0725466e8cd4'

const getForecast = (lat, lon, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to access weather services.', undefined)
    } else {
      const { weather, main } = response.body.list[0]
      const description = weather[0].description[0].toUpperCase() + weather[0].description.slice(1)
      const { temp, temp_max:max, temp_min:min } = main

      callback(undefined, `${description}. It is currently ${temp} degrees with a high of ${max} and a low of ${min}.`)
    }
  })
}

module.exports = getForecast