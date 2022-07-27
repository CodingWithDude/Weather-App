import { titleCase } from "title-case";

const name = document.querySelector("[data-name]");
const current = document.querySelector("[data-main]");
const currentDescription = document.querySelector("[data-description]");

async function renderCurrentWeather(input) {
  resetCurrentWeather();
  name.textContent = input.name;
  current.textContent = input.weather[0].main;
  currentDescription.textContent = titleCase(input.weather[0].description);
}

function resetCurrentWeather() {
  name.textContent = "";
  current.textContent = "";
  currentDescription.textContent = "";
}

export { renderCurrentWeather };
