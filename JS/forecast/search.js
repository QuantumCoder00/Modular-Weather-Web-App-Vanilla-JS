import { CITIES } from "../Service/locationService.js";

/* Filters cities based on Persian or English name */

function searchCities(query) {
  if (!query) return [];
  return CITIES.filter(city =>
    city.nameFa.includes(query) ||
    city.nameEn.toLowerCase().includes(query.toLowerCase())
  );
}

/* Renders search results inside result box */

function renderResults(cities, resultBox) {
  resultBox.innerHTML = cities.map(city => 
    `
    <li data-id="${city.id}">
      ${city.nameFa} - ${city.nameEn}
    </li>
  `).join("");
}

/* Handles search logic and user interactions */

function handleSearch(inputId, resultBoxId, onSelectCity) {

    /* Selects input and result elements */

  const input = document.getElementById(inputId);
  const resultBox = document.getElementById(resultBoxId);

  let activeIndex = -1;
  let currentResults = [];

    /* Updates results when user types */

  input.addEventListener("input", () => {
  const value = input.value.trim();
  currentResults = searchCities(value);
  activeIndex = -1;
  renderResults(currentResults, resultBox);
});

  /* Handles keyboard navigation (Arrow + Enter) */

  input.addEventListener("keydown", (e) => {
  const itemsCount = currentResults.length;

  if (!itemsCount) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % itemsCount;
    highlightItem(resultBox, activeIndex);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + itemsCount) % itemsCount;
    highlightItem(resultBox, activeIndex);
  }

  if (e.key === "Enter" && activeIndex >= 0) {
    e.preventDefault();
    onSelectCity(currentResults[activeIndex]);
  }
});

    /* Handles mouse click selection */

  resultBox.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const cityId = li.dataset.id;
  const city = CITIES.find(c => c.id === cityId);

  activeIndex = [...resultBox.children].indexOf(li);

  if (city) {
    onSelectCity(city);
  }
});
}

/* Highlights active item in search results */

function highlightItem(resultBox, index) {
  const items = resultBox.querySelectorAll("li");

  items.forEach(item => item.classList.remove("active"));

  if (items[index]) {
    items[index].classList.add("active");
    items[index].scrollIntoView({ block: "nearest" });
  }
}

export { handleSearch };