import { toPersianDigits } from "../utils/persianDigits.js";

// Formats raw API response into a clean structured object for the app

function formatWeatherData(data) {
  return {

// Stores timezone offset in seconds for time calculations

  utcOffset: data.utc_offset_seconds,

// Current weather data used for UI (details, icon, background)

  current: {
    temp: toPersianDigits(Math.round(data.current.temperature_2m)),
    weatherCode: data.current.weathercode,
    cloud: toPersianDigits(data.current.cloudcover),
    wind: toPersianDigits(data.current.windspeed_10m),
    humidity: toPersianDigits(data.current.relativehumidity_2m),
    isDay: data.current.is_day === 1,
    time: data.current.time, 
  },

// Daily forecast data used for 7-day slider and sunrise/sunset logic

  daily: {
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    forecast: data.daily.time.map((date, i) => ({
      date,
      min: toPersianDigits(Math.round(data.daily.temperature_2m_min[i])),
      max: toPersianDigits(Math.round(data.daily.temperature_2m_max[i])),
      weatherCode: data.daily.weathercode[i]
    }))
  }
};
  };
  
// Fetches weather data from Open-Meteo API based on coordinates

async function getWeatherData(lat, lon, timezone) {

// Builds API URL with current + 8-day forecast data

  const url =`
https://api.open-meteo.com/v1/forecast
?latitude=${lat}
&longitude=${lon}
&current=temperature_2m,weathercode,cloudcover,windspeed_10m,relativehumidity_2m,is_day
&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weathercode
&timezone=auto&forecast_days=8
`.trim();

  const res = await fetch(url);

// Throws error if API request fails

  if (!res.ok) throw new Error("Weather API failed");

  const data = await res.json();

// Returns formatted data ready for UI usage
    
  return formatWeatherData(data);
}

export { getWeatherData };
