// --- Imports ---
import { initTitleBar } from "./components/titleBar.js";
import { fetchFromQuery } from "./components/apiRouting.js";

// --- App Initialization ---
function initApp() {
  const app = document.getElementById("app");

  // --- Search Handlers ---
  const handleInputKeyPress = (event, inputElement) => {
    if (event.key === "Enter") {
      const query = inputElement.value.trim();
      fetchFromQuery(query);
    }
  };

  const handleButtonClick = (event, inputElement) => {
    const query = inputElement.value.trim();
    fetchFromQuery(query);
  };

  // --- Title Bar Component ---
  const titleBar = initTitleBar({
    titleText: "Weather App",
    onInputKeyPress: handleInputKeyPress,
    onButtonClick: handleButtonClick,
    searchPlaceholder: "Enter a town or city",
    // menuElement and hamburgerElement can be customized here if needed
  });

  // --- Content Div ---
  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";

  // --- Mount Components ---
  app.appendChild(titleBar);
  app.appendChild(contentDiv);
}

// --- Start App on DOM Ready ---
document.addEventListener("DOMContentLoaded", initApp);
