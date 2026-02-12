import { toPersianDigits } from "../utils/persianDigits.js";

// This function returns live date and time based on city UTC offset

function getLiveDateTime(offsetSeconds) {

// Validate offset input

  if (typeof offsetSeconds !== "number") return null;

// Get current UTC time

  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;

// Calculate city local time using offset

  const cityDate = new Date(utcMs + offsetSeconds * 1000);
  const timestamp = cityDate.getTime();

// Extract hour and minute from calculated city time  

  const hour = cityDate.getHours().toString().padStart(2, "0");
  const minute = cityDate.getMinutes().toString().padStart(2, "0");

// Create Persian calendar formatter

  const dateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// Extract formatted date parts

const parts = dateFormatter.formatToParts(cityDate);
const get = (type) => parts.find(p => p.type === type)?.value || " ";

// Clean weekday from Persian comma

const cleanWeekday = get("weekday").replace(/[،]/g, " ").trim();

// Build full Persian date string

const cleanDateFa = `${cleanWeekday} ${get("day")} ${get("month")} ${get("year")}`;

// Return formatted date and time object

return {
  weekdayFa: cleanWeekday,
  dateFa: `${get("day")} ${get("month")} ${get("year")}`,
  timeFa: toPersianDigits(`${hour}:${minute}`),
  timestamp: timestamp
};
}

export { getLiveDateTime };