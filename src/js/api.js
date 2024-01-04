async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=007a971e573649c98cb144548232311&q=${location}`,
      { mode: "cors" }
    );

    if (!response.ok) {
      const message = "Location not found";
      return new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

async function getData(location) {
  const weatherData = await getWeather(location);

  return weatherData;
}

export { getWeather, getData };
