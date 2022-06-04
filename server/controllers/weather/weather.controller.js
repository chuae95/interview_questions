const fetch = require('node-fetch');

const getWeather = async (req, res) => {

    let data = await fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast");

    let body = await data.json();

    let locations = body.area_metadata;
    let forecasts = body.items[0].forecasts;
    let period = body.items[0].valid_period;

    res.send({
        places: locations,
        weather: forecasts,
        timeframe: period
    })

}

module.exports = { getWeather };