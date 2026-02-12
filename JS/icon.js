import { mapWeather } from "./Service/weathermapper.js";

// Sets the correct weather icon based on weather code and day/night state

function setWeatherIcon(weatherCode, cloudPercent, isDay) {

// Maps weather data to the correct icon type

  const { iconType } = mapWeather(weatherCode, cloudPercent, isDay);

// Selects the icon container element from DOM  

  const iconEl = document.getElementById("weatherIcon");
  if (!iconEl) return;

// Injects the corresponding SVG icon into the container  

  iconEl.innerHTML = `<img src="Assets/ICON/${iconType}.svg" />`;
}

console.log("icon func called")
export { setWeatherIcon };