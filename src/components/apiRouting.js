import { currentWeather } from "./currentWeather.js";

function updateWeatherInfo(name, data) {
  const contentDiv = document.getElementById("content-div");
  const oldWeatherDiv = document.getElementById("weather-div");
  if (oldWeatherDiv) {
    oldWeatherDiv.remove();
    const newWeatherDiv = currentWeather(name, data);
    contentDiv.appendChild(newWeatherDiv);
  } else {
    const newWeatherDiv = currentWeather(name, data);
    contentDiv.appendChild(newWeatherDiv);
  }
  console.log("Weather data received:", data);
}

export async function fetchFromQuery(query) {
  const apiKey = "b7888b07411ce564248053345ab0dbdd";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Geocoding data received:", data);
    fetchWeather(data[0].name, data[0].lat, data[0].lon);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function fetchWeather(name, lat, lon) {
  const apiKey = "b7888b07411ce564248053345ab0dbdd";
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    updateWeatherInfo(name, data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
