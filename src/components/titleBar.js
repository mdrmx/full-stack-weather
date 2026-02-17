import { menuBtn } from "./ui_components/menuBtn.js";
import { createMenuPanel } from "./ui_components/menuPanel.js";
import { searchInput } from "./ui_components/searchInput.js";

/**
 * Highly modular title bar component
 * @param {Object} options - Customization options
 * @param {string} options.titleText - Title text
 * @param {HTMLElement} options.menuElement - Custom menu element
 * @param {function} options.onInputKeyPress - Handler for input keypress
 * @param {function} options.onButtonClick - Handler for button click
 * @param {string} options.searchPlaceholder - Placeholder for search input
 * @param {HTMLElement} options.hamburgerElement - Custom hamburger/menu button
 * @returns {HTMLElement} title bar div
 */
export function initTitleBar({
  titleText = "Weather App",
  menuElement = null,
  onInputKeyPress,
  onButtonClick,
  searchPlaceholder = "Enter a town or city",
  hamburgerElement = null,
} = {}) {
  const titleDiv = document.createElement("div");
  titleDiv.id = "title-div";

  const h1 = document.createElement("h1");
  h1.textContent = titleText;

  const container = document.createElement("div");
  container.id = "container";

  const search = searchInput({
    onInputKeyPress,
    onButtonClick,
    placeholder: searchPlaceholder,
  });

  const hamburger = hamburgerElement || menuBtn();
  const menu = menuElement || createMenuPanel();

  titleDiv.appendChild(h1);
  container.appendChild(search);
  container.appendChild(hamburger);
  titleDiv.appendChild(menu);
  titleDiv.appendChild(container);

  return titleDiv;
}
