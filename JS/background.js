// Imports weather mapping logic to determine background type

import { mapWeather } from "./Service/weathermapper.js";

// Sets dynamic background image based on weather and day/night

function setBackground(weatherCode, cloudPercent, isDay) {
  const { backgroundType } = mapWeather(
    weatherCode,
    cloudPercent,
    isDay
  );

// Builds background image name from mapped weather type and time

  const time = isDay ? "day" : "night";
  const imageName = `${backgroundType}-${time}.webp`;
  const imagePath = `Assets/BC/${imageName}`;

// Selects background container element

  const bg = document.getElementById("background");
  if (!bg) return;

// Applies background image dynamically  

  bg.style.backgroundImage = `url("${imagePath}")`;
}
export { setBackground };