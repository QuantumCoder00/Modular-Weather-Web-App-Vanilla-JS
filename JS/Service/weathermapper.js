// Maps API weather data to background and icon types

function mapWeather(weatherCode, cloudPercent, isDay, windSpeed = 0) {

// Default fallback values

  let backgroundType = "cloudy";
  let iconType = "cloudy";

// Clear sky condition

  if (weatherCode === 0) {
    backgroundType = isDay ? "sunny" : "moonlit";
    iconType = isDay ? "sunny" : "clear-night";
  }

// Partly cloudy / Cloudy

  else if (weatherCode <= 3) {
    backgroundType = cloudPercent < 50 ? "half-cloudy" : "cloudy";

    if (cloudPercent < 50) {
      iconType = isDay
        ? "partly-cloudy"
        : "partly-cloudy-night";
    } else {
      iconType = "cloudy";
    }
  }

// Fog / Mist

  else if (weatherCode >= 45 && weatherCode <= 48) {
    backgroundType = "cloudy";
    iconType = isDay ? "hazy" : "hazy-night";
  }

// Rain conditions

  else if (weatherCode >= 51 && weatherCode <= 67) {
    backgroundType = "rainy";

    if (windSpeed > 30) {
      iconType = "heavy-rain-strong-wind";
    } else if (cloudPercent < 50) {
      iconType = "partly-cloudy-shower";
    } else {
      iconType = "rainy";
    }
  }

// Showers

  else if (weatherCode >= 80 && weatherCode <= 82) {
    backgroundType = "rainy";
    iconType = "showers-rain";
  }

// Snow conditions

  else if (weatherCode >= 71 && weatherCode <= 77) {
    backgroundType = "snow";
    iconType = "snow";
  }

// Thunderstorm

  else if (weatherCode >= 95) {
    backgroundType = "storm";
    iconType = "thunderstorm";
  }

// Wind override for clear weather

  if (windSpeed > 35 && weatherCode <= 3) {
    iconType = "windy";
  }

// Returns final mapping result

  return { backgroundType, iconType };
}

export { mapWeather };