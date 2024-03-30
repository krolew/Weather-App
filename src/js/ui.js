import Api from "../js/api"
import Util from "../js/util"
import api from "../js/api";

const App = (() => {
    async function init() {
        loadHomepage();
    }

    async function loadHomepage() {
        initalizeButtons();
        await defaultCity();
    }

    function initalizeButtons() {
        const searchInput = document.getElementById("weatherInput");

        searchInput.addEventListener("keyup", handleSearchInput);

        handleButtonGroups();
    }

    async function handleSearchInput(e) {
        e.preventDefault();
        clearErrorStyles();

        if (e.key === "Enter") {
            await handleSubmitSearchInput(e);
        }
    }

    async function defaultCity() {
        let location = "Warszawa";
        await handleSubmitActions(location);
    }

    async function handleSubmitSearchInput(e) {
        e. preventDefault();

        let location = e.target.value;

        if (location.trim() === "")
            return;

        await handleSubmitActions(location);
    }

     async function handleSubmitActions(location) {
         try {
             let [currentWeather, fiveDayWeather] = await Api.getWeathers(location);

             if (currentWeather === undefined || fiveDayWeather === undefined) {
                 handleErrorMessage("City not found");
                 return new Error("city not found");
             }

             fiveDayWeather = Util.extractFiveDaysWeather(fiveDayWeather.list);
             renderWeather(currentWeather);
             clearFiveDayWeatherCardDiv();
             renderFiveDayWeather(fiveDayWeather);
             setCelsiusBtnActiveAfterSubmit();
         } catch (err) {
             console.log(err);
         } finally {
             clearSearchInputValue();
         }
     }

    function handleErrorMessage(errMessage) {
       const inputBox = document.querySelector(".inputBox");
       const errorInput = document.querySelector(".errorInput");

       errorInput.innerText = errMessage;
       errorInput.style.display = "block";
       inputBox.style.borderBottom= "2px solid red";
    }

    function handleButtonGroups() {
        const buttonGroup = document.querySelectorAll("button");
        buttonGroup.forEach(button => {
            button.addEventListener("click", handleBtns);
        })
    }


    function handleBtns(e) {
        let prevButton = document.querySelector(".active");

        if (prevButton !== e.target) {
            prevButton.classList.remove("active");
            e.target.classList.add("active");

            if (e.target.id === "btnCelsius") {
                handleCelsiusBtn(e);
            }

            if (e.target.id === "btnFahrenheit") {
                handleFahrenheitBtn(e);
            }
        }
     }

    function handleCelsiusBtn(e) {
        e.target.addEventListener("click", changeTemperatureDegree(Util.fahrenheitToCelsius))
    }

    function handleFahrenheitBtn(e) {
        e.target.addEventListener("click", changeTemperatureDegree(Util.celsiusToFahrenheit));
    }

    function setCelsiusBtnActiveAfterSubmit() {
        const celsiusBtn = document.querySelector("#btnCelsius");

        let activeBtn =  document.querySelector(".active");

        if (activeBtn !== celsiusBtn) {
            activeBtn.classList.remove("active");
        }

        celsiusBtn.classList.add("active");
    }
    function changeTemperatureDegree(callback) {
        const temperatures = document.querySelectorAll(".temperature");

        temperatures.forEach( (temp ) => {

            temp.innerText = callback(parseFloat(temp.textContent));
        });
    }

    function clearSearchInputValue(input) {
        const searchInput = document.getElementById("weatherInput");
        searchInput.value = "";
    }
    function clearFiveDayWeatherCardDiv() {
        const weatherFiveDaysCardsDiv = document.querySelector(".weatherFiveDaysCards");

        while (weatherFiveDaysCardsDiv.firstChild) {
            weatherFiveDaysCardsDiv.removeChild(weatherFiveDaysCardsDiv.firstChild);
        }
    }
    function clearErrorStyles() {
        const inputBox = document.querySelector(".inputBox");
        const errorInput = document.querySelector(".errorInput");

        errorInput.style.display = "none";
        inputBox.style.borderBottom= "2px solid black";
    }
    function renderFiveDayWeather(data) {
        data.forEach(renderWeatherCard);
    }

    function renderWeather(data) {
        const weatherCountry = document.getElementById("country");
        const weatherTemperature = document.getElementById("temperature");
        const weatherType = document.getElementById("type");
        const weatherWindKph = document.getElementById("wind_kph");
        const weatherPressure = document.getElementById("pressure_in");
        const weatherVisKm = document.getElementById("vis_km");
        const weatherHumidity = document.getElementById("humidity");
        const weatherImg = document.getElementById("weatherImg");

        weatherCountry.innerText = `${data.name}, ${data.sys.country}`;
        weatherTemperature.innerText = `${Math.round(data.main.temp)}`;
        weatherType.innerText = data.weather[0].description;
        weatherWindKph.innerText = `Wind ${data.wind.speed} m/s`;
        weatherPressure.innerText = `Barometr ${data.main.pressure} hPa`;
        weatherVisKm.innerText = `Visiblity ${Math.floor(data.visibility / 1000)} km`;
        weatherHumidity.innerText = `Humidity ${data.main.humidity} %`;
        weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    function renderWeatherCard(data) {
        const weatherFiveDaysCardsDiv = document.querySelector(".weatherFiveDaysCards");

        let weatherCardDiv= document.createElement("div");
        let weatherCardDayNameDiv = document.createElement("div");
        let weatherCardImgDiv = document.createElement("div");
        let weatherCardDescriptionDiv = document.createElement("div");
        let weatherCardTemperatureDiv = document.createElement("div");

        let dayNameParagraph = document.createElement("p");
        let weatherDescriptionParagraph = document.createElement("p");
        let temperatureParagraph= document.createElement("p");

        let temperatureUnitLabel = document.createElement("label");

        let weatherImg = document.createElement("img");

        weatherCardDiv.classList = "weatherCard";
        weatherCardDayNameDiv.classList = "weatherCardDayName";
        weatherCardImgDiv.classList = "weatherCardImg";
        weatherCardDescriptionDiv.classList = "weatherCardDescription";
        weatherCardTemperatureDiv.classList = "weatherCardTemp";
        temperatureParagraph.classList = "temperature";
        temperatureUnitLabel.classList = "temperatureUnit";

        dayNameParagraph.textContent = Util.getDayName(data.dt_txt);
        weatherDescriptionParagraph.textContent = data.weather[0].description;
        temperatureParagraph.textContent = Math.round(parseInt(data.main.temp));
        temperatureUnitLabel.textContent = "°";
        weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherImg.alt = "Weather Image";

        weatherCardDayNameDiv.appendChild(dayNameParagraph);
        weatherCardImgDiv.appendChild(weatherImg);
        weatherCardDescriptionDiv.appendChild(weatherDescriptionParagraph);
        weatherCardTemperatureDiv.appendChild(temperatureParagraph);
        weatherCardTemperatureDiv.appendChild(temperatureUnitLabel);

        weatherCardDiv.appendChild(weatherCardDayNameDiv)
        weatherCardDiv.appendChild(weatherImg);
        weatherCardDiv.appendChild(weatherCardDescriptionDiv);
        weatherCardDiv.appendChild(weatherCardTemperatureDiv);

        weatherFiveDaysCardsDiv.appendChild(weatherCardDiv);
    }

    return {
        init,
    }

})()



export default App;

