// This component is responsible for displaying the current weather information for a given location.

// tab accordion for forecast data
function createAccordion(dayName, data) {
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  //8 tab accordion with day of the week as title and weather data as content
  const header = document.createElement("div");
  header.className = "accordion-header";
  header.textContent = dayName;

  const bottomContainer = document.createElement("div");
  bottomContainer.className = "accordion-content";

  const icon = document.createElement("img");
  icon.className = "weather-icon";
  icon.src = `http://openweathermap.org/img/wn/${data.icon}.png`;

  const tempInfo = document.createElement("div");
  tempInfo.className = "temp-info";

  const maxTemp = document.createElement("p");
  maxTemp.textContent = data.maxTemp + "º";

  const minTemp = document.createElement("p");
  minTemp.textContent = data.minTemp + "º";

  tempInfo.appendChild(maxTemp);
  tempInfo.appendChild(minTemp);

  bottomContainer.appendChild(icon);
  bottomContainer.appendChild(tempInfo);

  accordionItem.appendChild(header);
  accordionItem.appendChild(bottomContainer);

  return accordionItem;
}
export function createHourlyAccordion(hour, data) {
  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  const header = document.createElement("div");
  header.className = "accordion-header";
  header.textContent = hour;

  const bottomContainer = document.createElement("div");
  bottomContainer.className = "hourly-accordion-content";

  const icon = document.createElement("img");
  icon.className = "weather-icon";
  icon.src = `http://openweathermap.org/img/wn/${data.icon}.png`;

  const tempInfo = document.createElement("div");
  tempInfo.className = "temp-info";

  const temp = document.createElement("p");
  temp.textContent = data.temp + "º";

  tempInfo.appendChild(temp);
  bottomContainer.appendChild(icon);
  bottomContainer.appendChild(tempInfo);

  accordionItem.appendChild(header);
  accordionItem.appendChild(bottomContainer);

  return accordionItem;
}
export function currentWeather(name, data) {
  const weatherDiv = document.createElement("div");
  weatherDiv.id = "weather-div";

  const img = document.createElement("img");
  img.src = "public/images/rainy-banner.png";
  img.id = "weather-banner";
  weatherDiv.appendChild(img);
  const locationName = document.createElement("div");
  locationName.id = "location-name";
  locationName.textContent = `${name}`;
  weatherDiv.appendChild(locationName);

  const accordionContainer = document.createElement("div");
  accordionContainer.id = "accordion-container";
  weatherDiv.appendChild(accordionContainer);

  // Track selected day index
  let selectedDayIndex = 0;

  // Helper to update selected UI and hourly forecast
  function updateSelection(newIndex) {
    // Highlight selected day
    Array.from(accordionContainer.children).forEach((item, idx) => {
      if (idx === newIndex) {
        item.classList.add("selected-accordion-item");
      } else {
        item.classList.remove("selected-accordion-item");
      }
    });
    // Update hourly forecast
    renderHourlyForecast(newIndex);
  }

  // Render daily accordions
  for (let i = 0; i < data.daily.length - 1; i++) {
    const dayData = data.daily[i];
    const dataStructure = {
      icon: dayData.weather[0].icon,
      maxTemp: dayData.temp.max,
      minTemp: dayData.temp.min,
      temp: dayData.temp.day,
      description: dayData.weather[0].description,
    };
    let dayName;
    if (i === 0) {
      dayName = "Today";
    } else {
      dayName = new Date(dayData.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
    }
    const accordion = createAccordion(dayName, dataStructure);
    accordion.addEventListener("click", () => {
      selectedDayIndex = i;
      updateSelection(i);
    });
    accordionContainer.appendChild(accordion);
  }

  // Highlight the first day by default
  setTimeout(() => updateSelection(0), 0);

  const forecastDiv = document.createElement("div");
  forecastDiv.id = "forecast-div";
  weatherDiv.appendChild(forecastDiv);

  const currentDescription = document.createElement("div");
  currentDescription.id = "current-description";
  currentDescription.textContent = `${data.current.weather[0].description}`;
  //make first letter of description uppercase
  currentDescription.textContent =
    currentDescription.textContent.charAt(0).toUpperCase() +
    currentDescription.textContent.slice(1);
  forecastDiv.appendChild(currentDescription);

  const hourlyContainer = document.createElement("div");
  hourlyContainer.id = "hourly-container";
  forecastDiv.appendChild(hourlyContainer);

  // Helper to render hourly forecast for selected day
  function renderHourlyForecast(dayIdx) {
    hourlyContainer.innerHTML = "";
    // Find the date for the selected day
    const selectedDay = data.daily[dayIdx];
    if (!selectedDay) return;
    const dayStart = new Date(selectedDay.dt * 1000);
    const dayYear = dayStart.getFullYear();
    const dayMonth = dayStart.getMonth();
    const dayDate = dayStart.getDate();
    // Filter hourly data for this day
    const hoursForDay = data.hourly.filter((h) => {
      const d = new Date(h.dt * 1000);
      return (
        d.getFullYear() === dayYear &&
        d.getMonth() === dayMonth &&
        d.getDate() === dayDate
      );
    });
    for (let i = 0; i < hoursForDay.length; i++) {
      const hourData = hoursForDay[i];
      const dataStructure = {
        icon: hourData.weather[0].icon,
        temp: hourData.temp,
        description: hourData.weather[0].description,
      };
      const hour = new Date(hourData.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const accordion = createHourlyAccordion(hour, dataStructure);
      hourlyContainer.appendChild(accordion);
    }
  }

  // Initial hourly forecast for first day
  // (already called by setTimeout above)

  return weatherDiv;
}
