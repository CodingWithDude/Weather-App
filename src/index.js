import "./styles/reset.sass";
import "./styles/main.sass";
import { titleCase } from "title-case";

const lookup = require("country-code-lookup");

const API_KEY = "07006f47faeeb182ebfc9361681cc9b0";

const locationSearchForm = document.getElementById("location-search-form");
const inputSearchLocation = document.getElementById("input-search-location");
const submitSearchLocation = document.getElementById("submit-search-location");
const errorMsg = document.getElementById("errorMsg");

// Submit Event Listener
locationSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputHandler(inputSearchLocation.value);
});

// Input Handler
function inputHandler(input) {
  // test if zipcode
  if (/\d/.test(input)) {
    const segments = input.split(",");
    const zipcode = segments[0];
    const countryCode = countryToCode(segments[1]);
    geocodingZipcode(`${zipcode},${countryCode}`);
  } else {
    getCoordinatesByLocationName(input);
  }
}

// Converts countries to iso2 country code
function countryToCode(countryName) {
  countryName = countryName.substring(1);
  countryName = titleCase(countryName);
  countryName = lookup.byCountry(countryName);
  return countryName.iso2;
}

// Coordinates by zipcode
async function geocodingZipcode(input) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${input}&appid=${API_KEY}`
  );
  const data = await response.json();
  getCurrentWeather(data);
}

// Coordinates by location name
async function getCoordinatesByLocationName(input) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) {
      error();
      return;
    }
    const data = await response.json();
    getCurrentWeather(data[0]);
  } catch {
    error();
  }
}

// Weather Request
async function getCurrentWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    resetInputAndError();
  } catch {
    error();
  }
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
