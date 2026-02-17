// This component is responsible for displaying the current weather information for a given location.
export function currentWeather(name, data) {
  const weatherDiv = document.createElement("div");
  weatherDiv.id = "weather-div";

  const locationName = document.createElement("h2");
  locationName.id = "location-name";
  locationName.textContent = `${name}`;
  weatherDiv.appendChild(locationName);

  // You can add more elements to display the weather information as needed.
  const weatherIcon = document.createElement("img");
  weatherIcon.id = "weather-icon";
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
  weatherDiv.appendChild(weatherIcon);

  const weatherDescription = document.createElement("p");
  weatherDescription.id = "weather-description";
  weatherDescription.textContent = `${data.current.weather[0].description}`;
  weatherDiv.appendChild(weatherDescription);

  const tempElement = document.createElement("p");
  tempElement.id = "temperature";
  tempElement.textContent = `${data.current.temp}°C`;
  weatherDiv.appendChild(tempElement);
  return weatherDiv;
}
