// This function binds click and context menu actions to city items

export function bindCityActions({
  containerId,
  getCities,
  getActiveCityId,
  setActiveCityId,
  removeCity,
  render
}) {

// Selects the city list container

  const container = document.getElementById(containerId);

// Selects the custom context menu element

  const menu = document.getElementById("cityContextMenu");

  let targetCityId = null;

// Handles left click to activate a city

  container.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    setActiveCityId(li.dataset.id);
    render();
  });

// Handles right click to open context menu

  container.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const li = e.target.closest("li");
    if (!li) return;

// Stores the selected city id for menu actions

    targetCityId = li.dataset.id;

    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.style.display = "block";
  });

// Handles context menu actions (activate or remove)  

  menu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action || !targetCityId) return;

    if (action === "active") {
      setActiveCityId(targetCityId);
    }

    if (action === "remove") {
      removeCity(targetCityId);
    }

// Hides the context menu after action

    menu.style.display = "none";
    targetCityId = null;
    render();
  });

// Closes the context menu when clicking outside

  document.addEventListener("click", () => {
    menu.style.display = "none";
    targetCityId = null;
  });
}