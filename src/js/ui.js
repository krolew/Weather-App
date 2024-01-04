import { getData } from "./api";

function renderData(data) {
  const weatherCountry = document.getElementById("country");
  const weatherTemperature = document.getElementById("temperature");
  const weatherType = document.getElementById("type");
  const weatherWindKph = document.getElementById("wind_kph");
  const weatherPressure = document.getElementById("pressure_in");
  const weatherVisKm = document.getElementById("vis_km");
  const weatherHumidity = document.getElementById("humidity");
  const weatherImg = document.getElementById("weatherImg");

  weatherCountry.innerText = `${data.location.name}, ${data.location.country}`;
  weatherTemperature.innerText = `${data.current.temp_c}°`;
  weatherType.innerText = data.current.condition.text;
  weatherWindKph.innerText = `Wind ${data.current.wind_kph} km/h`;
  weatherPressure.innerText = `Barometr ${data.current.pressure_in} in`;
  weatherVisKm.innerText = `Visiblity ${data.current.vis_km} km`;
  weatherHumidity.innerText = `Humidity ${data.current.humidity} %`;
  weatherImg.src = data.current.condition.icon;
  console.log(data.current.condition.icon);
}

function initalizeButtons() {
  const searchInput = document.getElementById("weatherInput");
  const celciusBtn = document.getElementById("btnCelcius");
  const btnFarenheit = document.getElementById("btnFarenheit");

  searchInput.addEventListener("keyup", handleSearchInput);
  celciusBtn.addEventListener("click", handleCelciusBtn);
  btnFarenheit.addEventListener("click", handleFarenheitBtn);
}

async function handleSearchInput(e) {
  e.preventDefault();

  if (e.key == "Enter") {
    const location = e.target.value;
    const weatherData = await getData(location);
    console.log(weatherData);
    renderData(weatherData);
  }
}

function handleCelciusBtn(e) {
  console.log(e.target);
}

function handleFarenheitBtn(e) {
  console.log(e.target);
}

export { renderData, initalizeButtons };
