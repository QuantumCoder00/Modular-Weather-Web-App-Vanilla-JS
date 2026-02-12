import { toPersianDigits } from "./utils/persianDigits.js";

/* Render current weather detail values into the UI */

function renderWeatherDetails(weatherData) {

// Select cloud percentage element and render value

  document.getElementById("clouds").textContent =
    toPersianDigits(weatherData.current.cloud) + "٪";

 const precipitationEl = document.getElementById("precipitation");

const precipitation = weatherData.current.precipitation;
const weatherCode = weatherData.current.weatherCode;

// Define weather codes that represent rainy conditions

const rainyCodes = [61, 63, 65, 80, 81, 82];

// Handle precipitation display logic

if (precipitation > 0) {
  precipitationEl.textContent =
    toPersianDigits(precipitation) + " میلی‌متر";
} else if (rainyCodes.includes(weatherCode)) {
  precipitationEl.textContent = "در حال بارندگی";
} else {
  precipitationEl.textContent = "۰";
}

// Render wind speed

  document.getElementById("wind").textContent =
    toPersianDigits(weatherData.current.wind) + " km/h";

// Render humidity percentage

  document.getElementById("humidity").textContent =
    toPersianDigits(weatherData.current.humidity) + "٪";
}

export { renderWeatherDetails };

/* Render today's min and max temperature */

function renderTemperature(weatherData) {

// Select first day forecast (today)

  const today = weatherData.daily.forecast[0];

  document.getElementById("tempMin").textContent = today.min;
  document.getElementById("tempMax").textContent = today.max;
}

export { renderTemperature };