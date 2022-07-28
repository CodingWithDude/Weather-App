const mainContainer = document.getElementById("main-container");
const currentDescription = document.querySelector("[data-weather-description]");
const name = document.querySelector("[data-name]");
const currentTemp = document.querySelector("[data-main-temp]");
const feelsLike = document.querySelector("[data-main-feels_like]");
const humidity = document.querySelector("[data-main-humidity]");
const wind = document.querySelector("[data-wind-speed]");
const speedUnitSymbol = document.querySelector("[data-wind-speed-symbol]");
const todaysDate = document.querySelector("[data-date-today]");
const tempUnitSymbol = document.querySelector("[data-temp-unit-symbol]");

async function renderCurrentWeather(input) {
  if (mainContainer.classList.contains("hide")) {
    mainContainer.classList.toggle("hide");
  }
  resetCurrentDisplayUnit();
  console.log("here");
  currentDescription.textContent = input.currentDescription;
  name.textContent = input.name;
  currentTemp.textContent = `${input.currentTemp}${input.tempUnitSymbol}`;
  todaysDate.textContent = input.todaysDate;
  feelsLike.textContent = `${input.feelsLike}${input.tempUnitSymbol}`;
  humidity.textContent = `${input.humidity}%`;
  wind.textContent = `${input.wind}`;
  speedUnitSymbol.textContent = `${input.speedUnitSymbol}`;
  todaysDate.textContent = `${input.todaysDate}`;
  tempUnitSymbol.textContent = `Display ${input.tempUnitSymbol}`;
}

function resetCurrentDisplayUnit() {
  currentDescription.textContent = null;
  name.textContent = null;
  currentTemp.textContent = null;
  todaysDate.textContent = null;
  feelsLike.textContent = null;
  humidity.textContent = null;
  wind.textContent = null;
  speedUnitSymbol.textContent = null;
  todaysDate.textContent = null;
  tempUnitSymbol.textContent = null;
}

export { renderCurrentWeather };
