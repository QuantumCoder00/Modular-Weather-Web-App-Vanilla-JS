// Initializes horizontal scroll behavior for 7-day forecast slider

function initSevenDaySlider() {

// Select main forecast container and navigation buttons

  const container = document.getElementById("sevenday");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

// Exit if required elements do not exist

  if (!container || !prevBtn || !nextBtn) return;

// Select all forecast day cards

  const days = container.querySelectorAll(".day");

// Exit if no forecast items exist

  if (!days.length) return;

// Define spacing between cards (must match CSS gap)

  const gap = 50;

// Calculate single card width including gap

  const dayWidth = days[0].offsetWidth + gap;

// Calculates maximum scrollable distance

  function getMaxScroll() {
    return container.scrollWidth - container.clientWidth;
  }

// Enables/disables navigation buttons based on scroll position

  function updateButtons() {
    const maxScroll = getMaxScroll();

// In RTL layouts scrollLeft is reversed in some browsers

    const currentScroll = Math.abs(container.scrollLeft);

    prevBtn.disabled = currentScroll <= 5;
    nextBtn.disabled = currentScroll >= maxScroll - 5;
  }

// Scrolls forward in RTL direction

  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -dayWidth,
      behavior: "smooth",
    });
  });

// Scrolls backward in RTL direction

  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: dayWidth,
      behavior: "smooth",
    });
  });

// Updates button state on manual scroll

  container.addEventListener("scroll", updateButtons);

// Initial button state check

  updateButtons();
}

// Exports slider initializer

export { initSevenDaySlider };