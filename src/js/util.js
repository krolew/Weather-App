import {format} from "date-fns";

const Util = (() => {
    function extractFiveDaysWeather(weathers) {
        return weathers.filter(getWeatherForDayAt15);
    }

    function getWeatherForDayAt15(weather) {
        const [date, hours] = weather.dt_txt.split(" ");
        const [hour, minute, seconds] = hours.split(":");

        if (hour === "15")
            return weather;
    }

    function getDayName(dt_txt) {
        const day = format(new Date(dt_txt), "EEEE");

        return day;
    }

    function celsiusToFahrenheit(temp) {
        return Math.round(((temp * 9.0 / 5.0) + 32.0));
    }

    function fahrenheitToCelsius(temp) {
        return Math.round((temp - 32) / 1.8);
    }

       return {
        extractFiveDaysWeather,
        getDayName,
        celsiusToFahrenheit,
        fahrenheitToCelsius,
    }
})()

export default Util;
