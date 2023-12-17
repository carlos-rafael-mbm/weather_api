const convertKelvinToCelsius = (kelvinValue) => {
    return Math.round(kelvinValue - 273.15);
}

module.exports = { convertKelvinToCelsius }