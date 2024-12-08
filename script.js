document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".scroll-container");
  const items = container.querySelectorAll(".scroll-container-item");

  if (items.length > 0) {
    // Clone the first and last items
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    // Add them to the container
    container.insertBefore(lastClone, items[0]); // Add the last item clone to the beginning
    container.appendChild(firstClone); // Add the first item clone to the end
  }
});
