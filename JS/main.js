import { handleSearch } from "./forecast/search.js";
import { bindCityActions } from "./cityActions.js";
import { getWeatherData } from "./Service/weatherService.js";
import { setBackground } from "./background.js";
import { setWeatherIcon } from "./icon.js";
import { renderWeatherDetails } from "./details.js";
import { renderTemperature } from "./details.js";
import { renderDateTime } from "./datetime.js";
import { renderSevenDayForecast } from "./forecast/sevenDayRenderer.js";
import { initSevenDaySlider } from "./forecast/sevenDaySlider.js";

/* Stores selected cities and active city state */

const selectedCities = [];
let activeCityId = null;
let isFirstSelection = true;

/* Renders selected cities list with active highlight */

function renderSelectedCities() {
  const list = document.getElementById("location");
  if (!list) return;

  list.innerHTML = selectedCities.map(city => 
    `<li
      data-id="${city.id}"
      class="${city.id === activeCityId ? "active-city" : ""}"
    >
      ${city.nameFa}
    </li>
  `).join("");
}

/* Updates main city title based on active city */

function renderActiveCityName() {
  const cityEl = document.getElementById("city");
  if (!cityEl) return;

  const activeCity = selectedCities.find(c => c.id === activeCityId);
  if (!activeCity) return;

  cityEl.textContent = activeCity.nameFa;
}

function resetSearchModal() {
  const input = document.getElementById("cityInput");
  const results = document.getElementById("searchResults");

  if (input) input.value = "";
  if (results) results.innerHTML = "";

  clearModalMessage();
}

function showModalMessage(text) {
  const msg = document.getElementById("searchMessage");
  if (msg) msg.textContent = text;
}

function clearModalMessage() {
  const msg = document.getElementById("searchMessage");
  if (msg) msg.textContent = "";
}

/* Handles full activation flow when a city becomes active */

async function activateCity(id) {
  activeCityId = id;

  renderSelectedCities();
  renderActiveCityName();

  const city = selectedCities.find(c => c.id === id);
  if (!city) return;

  const weatherData = await getWeatherData(
    city.lat,
    city.lon,
    city.timezone
  );

  renderDateTime(weatherData.utcOffset);

  const isDay = weatherData.current.isDay;

  setBackground(
    weatherData.current.weatherCode,
    weatherData.current.cloud,
    isDay
  );

  setWeatherIcon(
    weatherData.current.weatherCode,
    weatherData.current.cloud,
    isDay
  );
  renderSevenDayForecast(weatherData.daily);
  initSevenDaySlider();
  renderWeatherDetails(weatherData);
  renderTemperature(weatherData);
}

/* Initializes modal, search and first city selection logic */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("searchModal");
  const searchBtn = document.getElementById("searchIcon");
  const cancelBtn = document.getElementById("closerModal");

  modal.classList.add("open");

  cancelBtn.addEventListener("click", () => {
    if (isFirstSelection) return;
    modal.classList.remove("open");
    clearModalMessage();
  });

  searchBtn.addEventListener("click", () => {
    resetSearchModal();
    modal.classList.add("open");

    setTimeout(() => {
      document.getElementById("cityInput")?.focus();
    }, 100);
  });

  /* Handles search selection and auto-activation */

  handleSearch(
    "cityInput",
    "searchResults",
    async (city) => {

      if (selectedCities.find(c => c.id === city.id)) {
        showModalMessage("این شهر قبلاً انتخاب شده");
        return;
      }

      if (selectedCities.length >= 4) {
        showModalMessage("حداکثر ۴ شهر می‌توانید انتخاب کنید");
        return;
      }

      clearModalMessage();

      selectedCities.push(city);

      await activateCity(city.id);

      resetSearchModal();
      modal.classList.remove("open");

      if (isFirstSelection) {
        isFirstSelection = false;
      }
    }
  );
});

/* Binds city list actions (activate / remove) */

bindCityActions({
  containerId: "location",
  getCities: () => selectedCities,
  getActiveCityId: () => activeCityId,
  setActiveCityId: async (id) => {
    await activateCity(id);
  },

  removeCity: (id) => {
    const index = selectedCities.findIndex(c => c.id === id);
    if (index > -1) selectedCities.splice(index, 1);

    if (activeCityId === id) {
      activeCityId = selectedCities[0]?.id || null;
      if (activeCityId) activateCity(activeCityId);
    }

    renderSelectedCities();
    renderActiveCityName();
  },

  render: renderSelectedCities,
});
