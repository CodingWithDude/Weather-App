const mainContainer = document.getElementById("main-container");
const currentDescription = document.querySelector("[data-weather-description]");
const name = document.querySelector("[data-name]");
const currentTemp = document.querySelector("[data-main-temp]");
const feelsLike = document.querySelector("[data-main-feels_like]");
const humidity = document.querySelector("[data-main-humidity]");
const wind = document.querySelector("[data-wind-speed]");
const speedUnitSymbol = document.querySelector("[data-wind-speed-symbol]");
const todaysDate = document.querySelector("[data-date-today]");

async function renderCurrentWeather(input) {
  mainContainer.classList.toggle("hide");
  currentDescription.textContent = input.currentDescription;
  name.textContent = input.name;
  currentTemp.textContent = `${input.currentTemp}${input.tempUnitSymbol}`;
  todaysDate.textContent = input.todaysDate;
  feelsLike.textContent = `${input.feelsLike}${input.tempUnitSymbol}`;
  humidity.textContent = `${input.humidity}%`;
  wind.textContent = `${input.wind}`;
  speedUnitSymbol.textContent = `${input.speedUnitSymbol}`;
  todaysDate.textContent = `${input.todaysDate}`;
}

function resetCurrentWeather() {
  name.textContent = "";

  currentDescription.textContent = "";
}

export { renderCurrentWeather };
