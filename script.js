document.addEventListener("DOMContentLoaded", () => {
  // Select the scroll container and its child items
  const container = document.querySelector(".scroll-container");
  const items = container.querySelectorAll(".scroll-container-item");

  // Check if there are enough items to duplicate
  if (items.length > 0) {
    // Clone the first and last items
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    // Add the clones to the container
    container.insertBefore(lastClone, items[0]); // Add last item clone at the beginning
    container.appendChild(firstClone); // Add first item clone at the end
  }
});
