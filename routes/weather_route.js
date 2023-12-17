const { Router } = require('express');
const { getWeather, getWeatherIcon } = require('../controllers/weather_controller');

const router = Router();

router.get('/', getWeather);

router.get('/image', getWeatherIcon);

module.exports = router;