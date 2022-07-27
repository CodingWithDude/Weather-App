import { titleCase } from "title-case";
import { renderCurrentWeather } from "./domFunctions";
import date from "date-and-time";

const lookup = require("country-code-lookup");

const inputSearchLocation = document.getElementById("input-search-location");
const errorMsg = document.getElementById("errorMsg");

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

function currentTempUnit() {
  return "fahrenheit";
}

function changeTempUnit(currentUnit) {
  if (currentUnit === "celsius") {
    return "fahrenheit";
  } else {
    return "celsius";
  }
}

function getTempUnit(input) {
  if (currentTempUnit() === "fahrenheit") {
    return kelvinToFahrenheit(input);
  } else {
    return kelvinToCelsius(input);
  }
}

function getTempUnitSymbol() {
  if (currentTempUnit() === "fahrenheit") {
    return "°F";
  } else {
    return "°C";
  }
}

function metersPerSecondToMilesPerHour(input) {
  if (currentTempUnit() === "fahrenheit") {
    return Math.floor(2.23694 * Number(input));
  } else {
    return Math.floor(input);
  }
}

function getSpeedUnitSymbol() {
  if (currentTempUnit() === "fahrenheit") {
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
  console.log(date.format(now, "ddd, MMM DD YYYY"));
  return date.format(now, "ddd, MMM DD YYYY");
}

function formatCurrentWeather(input) {
  const currentDescription = titleCase(input.weather[0].description);
  const name = input.name;
  const currentTemp = getTempUnit(input.main.temp);
  const feelsLike = getTempUnit(input.main.feels_like);
  const humidity = input.main.humidity;
  const wind = metersPerSecondToMilesPerHour(input.wind.speed);
  const tempUnitSymbol = getTempUnitSymbol();
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
}

export { countryToCode, error, resetInputAndError, formatCurrentWeather };
