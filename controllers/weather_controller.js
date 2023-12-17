const axios = require('axios');
const { request, response } = require('express');
const { convertKelvinToCelsius } = require('../helpers/convert_temperature');

const getWeather = async(req = request, res = response) => {
    const weatherParams = {
        q: req.query.city,
        appid: process.env.API_KEY
    };
    try {
        const weatherData = await axios.get(process.env.API, { params: weatherParams });
        const weather = weatherData.data;
        const weatherResponse = {
            description: weather.weather && weather.weather.length > 0 ? weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1) : '',
            temp: convertKelvinToCelsius(weather.main.temp),
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
            city: weather.name + ', ' + weather.sys.country,
            timezone: weather.timezone,
            icon: weather.weather[0].icon
        }
        console.log(weatherResponse);
        res.json({ ...weatherResponse });
    } catch (error) {
        res.status(500).json({ msg: 'Error with Weather Api' });
    }
}

const getWeatherIcon = async(req = request, res = response) => {
    try {
        const imageWeather = await axios.get(`https://openweathermap.org/img/wn/${req.query.icon}.png`, {
            responseType: 'arraybuffer',
        });
        res.set('Content-Type', 'image/jpeg');
        res.send(imageWeather.data);
    } catch (error) {
        res.status(500).json({ msg: 'Error: Get image' });
    }
}

module.exports = { getWeather, getWeatherIcon }