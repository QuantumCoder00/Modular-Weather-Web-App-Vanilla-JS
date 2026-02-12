// Imports utilities for digit conversion and weather mapping

import { toPersianDigits } from "../utils/persianDigits.js";
import { toEnglishDigits } from "../utils/englishDigits.js";
import { mapWeather } from "../Service/weathermapper.js";

// Renders 7-day forecast cards (excluding today)

function renderSevenDayForecast(dailyData) {

    // Select forecast container element

  const container = document.getElementById("sevenday");
  if (!container) return;

    // Clear previous forecast cards

  container.innerHTML = "";

    // Ensure forecast data exists

  if (!dailyData || !dailyData.forecast) return;

    // Skip today and take next 7 days

  const nextSevenDays = dailyData.forecast.slice(1, 8);

   // Convert Persian digits back to numbers and calculate average temperature

  nextSevenDays.forEach((day) => {
    const min = Number(toEnglishDigits(day.min));
    const max = Number(toEnglishDigits(day.max));

    const avgTemp = Math.round((min + max) / 2);

    // Format date into Persian weekday

    const formattedDate = new Date(day.date);

    const weekdayFormatter = new Intl.DateTimeFormat(
      "fa-IR-u-ca-persian",
      { weekday: "long" }
    );

    const weekdayFa = weekdayFormatter.format(formattedDate);

    const { iconType } = mapWeather(
      day.weatherCode,
      0,
      true
    );

    // Create forecast day card element

    const dayEl = document.createElement("div");
    dayEl.className = "day";

    // Inject forecast content into card

    dayEl.innerHTML =`
      <div class="forecast-weekday">${weekdayFa}</div>
      <img src="Assets/ICON/${iconType}.svg" class="forecast-icon" />
      <div class="forecast-temp">${toPersianDigits(avgTemp)}°</div>
    `;

    // Append card to container

    container.appendChild(dayEl);
  });
}

    // Export forecast renderer

export { renderSevenDayForecast };