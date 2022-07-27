import { error, resetInputAndError } from "./utils";
import { renderCurrentWeather } from "./domFunctions";

const API_KEY = "07006f47faeeb182ebfc9361681cc9b0";

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
    renderCurrentWeather(data);
    resetInputAndError();
  } catch {
    error();
  }
}

export {
  inputHandler,
  geocodingZipcode,
  getCoordinatesByLocationName,
  getCurrentWeather,
};
