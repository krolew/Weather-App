import Util from "../js/util.js"
import Ui from "../js/ui.js";

const Api = (() => {
    async function getWeathers(location, apiKey ="ee6b24dae6978abc8d8d4fbb69868568", units = "metric") {
        const urls = [
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`,
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`
        ]

        try {
            const [currentWeather, fiveDayWeather] = await fetchWeather(urls);
            return [currentWeather, fiveDayWeather];

        } catch (err) {
            console.log(err);
        }
    }

    async function fetchWeather(urls) {
        return Promise.all(
            urls.map(url => fetch(url, {mode: "cors"})
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .catch(error => error)
            )
        )
    }
    return {
        getWeathers,
    }

})()

export default Api;
