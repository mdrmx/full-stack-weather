import { menuBtn } from "./menuBtn.js";
import { createMenuPanel } from "./menuPanel.js";
import { searchInput } from "./searchInput.js";

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
export function initTitleBar(options) {
  const {
    titleText,
    onInputKeyPress,
    onButtonClick,
    searchPlaceholder,
    hamburgerElement,
    menuElement,
  } = options || {};
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
  titleDiv.appendChild(search);
  titleDiv.appendChild(hamburger);
  titleDiv.appendChild(menu);
  // titleDiv.appendChild(container);

  return titleDiv;
}
