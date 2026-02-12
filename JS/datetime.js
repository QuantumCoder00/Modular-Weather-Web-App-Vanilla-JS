import { getLiveDateTime } from "./Service/timeService.js";

// Manages timer instances to avoid duplicate intervals

let timer = null;
let timeoutId = null;

// Renders and keeps the live clock synced to the city's timezone

function renderDateTime(offsetSeconds) {
  const el = document.getElementById("datetime");
  if (!el || typeof offsetSeconds !== "number") return;

// Clears previous interval if city changes

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

// Clears pending timeout before scheduling a new one

  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

// Generates formatted date and time from timeService

  const render = () => {
    const dt = getLiveDateTime(offsetSeconds);
    if (!dt) return;

    el.innerHTML =` 
      <div class="dt-date">
        <span class="dt-weekday">${dt.weekdayFa}</span>
        <span class="dt-full-date">${dt.dateFa}</span>
      </div>
      <div class="dt-time">${dt.timeFa}</div>
    `;
  };

// Initial render on activation

  render();

// Calculates exact delay to sync with the next minute  

  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const cityNow = new Date(utcMs + offsetSeconds * 1000);

  const delayToNextMinute =
    (60 - cityNow.getSeconds()) * 1000 - cityNow.getMilliseconds();

// Starts precise minute-based interval after sync    

  timeoutId = setTimeout(() => {
    render();
    timer = setInterval(render, 60000);
  }, delayToNextMinute);
}

export { renderDateTime };