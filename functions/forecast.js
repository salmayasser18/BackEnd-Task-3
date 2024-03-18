
const request = require("request")

const forecast = (longitude, latitude, callback) => {

    const forecastUrl = "http://api.weatherapi.com/v1/current.json?key=871f6ea42f944c639b3210116240603&q="+latitude +"," +longitude +"&aqi=no";

    request({ url: forecastUrl, json: true }, (error, response) => {
        if (error) {
            callback("Weather API Service Unavailable", undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, {
                city: response.body.location.name,
                country: response.body.location.country,
                weather: response.body.current.condition.text
            })
        }
    })
}

module.exports = forecast