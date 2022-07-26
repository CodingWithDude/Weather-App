import { titleCase } from "title-case";

const lookup = require("country-code-lookup");

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

export { countryToCode, error, resetInputAndError };
