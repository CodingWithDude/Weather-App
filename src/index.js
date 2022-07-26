import "./styles/reset.sass";
import "./styles/main.sass";
import { inputHandler } from "./apiFunctions";

const locationSearchForm = document.getElementById("search-location-form");
const inputSearchLocation = document.getElementById("input-search-location");

// Submit Event Listener
locationSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputHandler(inputSearchLocation.value);
});
