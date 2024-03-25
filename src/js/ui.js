import Api from "../js/api"
import Util from "../js/util"

const App = (() => {
    function init() {
        loadHomepage();
    }

    function loadHomepage() {
        initalizeButtons();
    }

    function initalizeButtons() {
        const searchInput = document.getElementById("weatherInput");
        const celsiusBtn = document.getElementById("btnCelsius");
        const btnFahrenheit = document.getElementById("btnFahrenheit");

        searchInput.addEventListener("keyup", handleSearchInput);
        celsiusBtn.addEventListener("click", handleCelsiusBtn);
        btnFahrenheit.addEventListener("click", handleFahrenheitBtn);
    }

    async function handleSearchInput(e) {
        e.preventDefault();

        if (e.key === "Enter") {
            const location = e.target.value;
            const weatherData = await Api.getWeather(location);
            const weatherData5 = await Api.getFiveDayWeather(location);
            const fiveDaysWeather = Util.extractFiveDaysWeather(weatherData5);


            await renderData(weatherData);
            renderFiveDayWeather(fiveDaysWeather)
        }
    }

    function handleCelsiusBtn(e) {
        e.target.addEventListener("click", changeTemperatureDegree(Util.fahrenheitToCelsius))
    }

    function handleFahrenheitBtn(e) {
        e.target.addEventListener("click", changeTemperatureDegree(Util.celsiusToFahrenheit));
    }

    function changeTemperatureDegree(callback) {
        const temperatures = document.querySelectorAll(".temperature");

        temperatures.forEach(temp => {
            temp.innerText = callback(Math.round(parseInt(temp.outerText))) + "°";
        });
    }

    function renderFiveDayWeather(data) {
        data.forEach(renderWeatherBox);
    }

    async function renderData(data) {
        const weatherCountry = document.getElementById("country");
        const weatherTemperature = document.getElementById("temperature");
        const weatherType = document.getElementById("type");
        const weatherWindKph = document.getElementById("wind_kph");
        const weatherPressure = document.getElementById("pressure_in");
        const weatherVisKm = document.getElementById("vis_km");
        const weatherHumidity = document.getElementById("humidity");
        const weatherImg = document.getElementById("weatherImg");

        weatherCountry.innerText = `${data.name}, ${data.sys.country}`;
        weatherTemperature.innerHTML = `${Math.round(data.main.temp)}<label class="temperatureUnit">°</label>`;
        weatherType.innerText = data.weather[0].description;
        weatherWindKph.innerText = `Wind ${data.wind.speed} m/s`;
        weatherPressure.innerText = `Barometr ${data.main.pressure} hPa`;
        weatherVisKm.innerText = `Visiblity ${Math.floor(data.visibility / 1000)} km`;
        weatherHumidity.innerText = `Humidity ${data.main.humidity} %`;
        weatherImg.src = await Api.getImage(data.weather[0].icon);
    }

    async function renderWeatherBox(weather) {
        const weatherFiveDaysCards = document.querySelector(".weatherFiveDaysCards");
        const weatherBox = document.createElement("div");

        weatherBox.classList = "weatherCard";
        weatherBox.innerHTML +=
            `
         <div class="weatherCardDayName">
            <p>${Util.getDayName(weather.dt_txt)}</p>
         </div>
         <div class="weatherCardImg">
            <img src="${await Api.getImage(weather.weather[0].icon)}" alt="" >
         </div>
         <div class="weatherCardDescription">
            <p>${weather.weather[0].description}</p>
         </div>
         <div class="weatherCardTemp">
            <p class="temperature">
                ${Math.round(weather.main.temp)}
            </p>
            <label class="temperatureUnit">°</label>
         </div>
      `

        weatherFiveDaysCards.appendChild(weatherBox);
    }

    return {
        init: init,
    }

})()

export default App;

