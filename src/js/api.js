import Util from "../js/util.js"

const Api = (() => {
    async function getWeather(location, apiKey="ee6b24dae6978abc8d8d4fbb69868568", units="metric") {

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;

        try {
            const response = await fetch(apiUrl, {mode: "cors"});

            if (!response.ok) {
                const message = "Location not found";
                return new Error(message);
            }

            const weatherJson = await response.json();

            return weatherJson;
        } catch (err) {
            throw err;
        }
    }

    async function getFiveDayWeather(location, apiKey ="ee6b24dae6978abc8d8d4fbb69868568", units = "metric") {

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`;

        try {
            const response = await fetch(apiUrl, {mode: "cors"});

            if (!response.ok) {
                const message = "Location not found";
                return new Error(message);
            }

            const weathers = await response.json();

            return Util.extractFiveDaysWeather(weathers.list);
        } catch (err) {
            throw err;
        }
    }

    async function getImage(imgName) {
        const apiImg = `https://openweathermap.org/img/wn/${imgName}@2x.png`

        try {
            const response = await fetch(apiImg);
            const imageBlob = await response.blob();
            const imgUrl = URL.createObjectURL(imageBlob);

            return imgUrl;
        } catch (err) {
            return "";
        }
    }

    return {
        getWeather,
        getFiveDayWeather,
        getImage,
    }

})()

export default Api;
