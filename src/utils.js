import { titleCase } from "title-case";
import { renderCurrentWeather } from "./domFunctions";
import { inputHandler } from "./apiFunctions";
import date from "date-and-time";

const lookup = require("country-code-lookup");

// const LOCAL_STORAGE_DEFAULT_LOCATION_KEY = "weather.default_location";
const LOCAL_STORAGE_CURRENT_LOCATION_KEY = "weather.current_location";
const LOCAL_STORAGE_CURRENT_DISPLAY_UNIT_KEY = "weather.display_unit";
let currentLocation =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_LOCATION_KEY)) ||
  "phoenix";
let currentDisplayUnit =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRENT_DISPLAY_UNIT_KEY)) ||
  "fahrenheit";

const inputSearchLocation = document.getElementById("input-search-location");
const errorMsg = document.getElementById("errorMsg");
const displayBtn = document.querySelector("[data-temp-unit-symbol]");

window.addEventListener("load", () => {
  inputHandler(`${currentLocation}`);
});

displayBtn.addEventListener("click", (e) => {
  changeDisplayUnit();
});

function save() {
  localStorage.setItem(
    LOCAL_STORAGE_CURRENT_LOCATION_KEY,
    JSON.stringify(currentLocation)
  );
  localStorage.setItem(
    LOCAL_STORAGE_CURRENT_DISPLAY_UNIT_KEY,
    JSON.stringify(currentDisplayUnit)
  );
}

// Converts countries to iso2 country code
function countryToCode(countryName) {
  countryName = countryName.substring(1);
  countryName = titleCase(countryName);
  countryName = lookup.byCountry(countryName);
  return countryName.iso2;
}

function error() {
  errorMsg.innerText = `Location not found. Search must be in the form of:
  "City", "City, State", "City, Country", or "Zipcode, Country".`;
  errorMsg.classList.add("active-error");
  errorMsg.classList.remove("inactive-error");
}

function resetInputAndError() {
  errorMsg.innerText = "";
  inputSearchLocation.value = "";
  errorMsg.classList.add("inactive-error");
  errorMsg.classList.remove("active-error");
}

function getCurrentDisplayUnit() {
  return currentDisplayUnit;
}

function changeDisplayUnit() {
  if (getCurrentDisplayUnit() === "celsius") {
    currentDisplayUnit = "fahrenheit";
    save();
    inputHandler(`${currentLocation}`);
  } else {
    currentDisplayUnit = "celsius";
    save();
    inputHandler(`${currentLocation}`);
  }
}

function displayUnit(input) {
  if (getCurrentDisplayUnit() === "fahrenheit") {
    return kelvinToFahrenheit(input);
  } else {
    return kelvinToCelsius(input);
  }
}

function getDisplayUnitSymbol() {
  if (getCurrentDisplayUnit() === "fahrenheit") {
    return "°F";
  } else {
    return "°C";
  }
}

function metersPerSecondToMilesPerHour(input) {
  if (getCurrentDisplayUnit() === "fahrenheit") {
    return Math.floor(2.23694 * Number(input));
  } else {
    return Math.floor(input);
  }
}

function getSpeedUnitSymbol() {
  if (getCurrentDisplayUnit() === "fahrenheit") {
    return "mph";
  } else {
    return "m/s";
  }
}

function kelvinToFahrenheit(input) {
  return Math.round(((Number(input) - 273.15) * 9) / 5 + 32);
}

function kelvinToCelsius(input) {
  return Math.round(Number(input) - 273.1);
}

function getTodaysDate() {
  const now = new Date();
  return date.format(now, "ddd, MMM DD YYYY");
}

function formatCurrentWeather(input) {
  const currentDescription = titleCase(input.weather[0].description);
  const name = input.name;
  const currentTemp = displayUnit(input.main.temp);
  const feelsLike = displayUnit(input.main.feels_like);
  const humidity = input.main.humidity;
  const wind = metersPerSecondToMilesPerHour(input.wind.speed);
  const tempUnitSymbol = getDisplayUnitSymbol();
  const speedUnitSymbol = getSpeedUnitSymbol();
  const todaysDate = getTodaysDate();

  const formattedData = {
    currentDescription: `${currentDescription}`,
    name: `${name}`,
    currentTemp: `${currentTemp}`,
    feelsLike: `${feelsLike}`,
    humidity: `${humidity}`,
    wind: `${wind}`,
    tempUnitSymbol: `${tempUnitSymbol}`,
    speedUnitSymbol: `${speedUnitSymbol}`,
    todaysDate: `${todaysDate}`,
  };
  renderCurrentWeather(formattedData);
  currentLocation = name;
  save();
}

// inputHandler(currentLocation);
export { countryToCode, error, resetInputAndError, formatCurrentWeather, save };
