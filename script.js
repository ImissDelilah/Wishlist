document.addEventListener("DOMContentLoaded", () => {
  const scrollContainers = document.querySelectorAll(".scroll-container");

  scrollContainers.forEach((container) => {
    const createClones = () => {
      const items = container.querySelectorAll(".scroll-container-item");

      // Clone items to append and prepend
      const firstClones = Array.from(items).map((item) => item.cloneNode(true));
      const lastClones = Array.from(items).map((item) => item.cloneNode(true));

      // Append clones to the end
      firstClones.forEach((clone) => container.appendChild(clone));

      // Prepend clones to the start
      lastClones.reverse().forEach((clone) => container.insertBefore(clone, container.firstChild));
    };

    const resetScrollPosition = () => {
      const items = container.querySelectorAll(".scroll-container-item");
      const itemWidth = items[0].offsetWidth;
      const containerWidth = container.offsetWidth;

      // Adjust scroll position to the middle items
      const originalItemsStart = items.length / 3;
      container.scrollLeft = originalItemsStart * itemWidth - containerWidth / 2;
    };

    const monitorScroll = () => {
      const items = container.querySelectorAll(".scroll-container-item");
      const itemWidth = items[0].offsetWidth;
      const totalItems = items.length;
      const visibleItems = totalItems / 3; // Original + 2 clones
      const scrollPosition = container.scrollLeft;

      // Add new items when scrolling towards the end or beginning
      if (scrollPosition < itemWidth * visibleItems) {
        // Scrolling to the start - prepend new items
        const lastItem = items[items.length - 1];
        const lastClone = lastItem.cloneNode(true);
        container.insertBefore(lastClone, container.firstChild);
      } else if (scrollPosition > itemWidth * (items.length - visibleItems)) {
        // Scrolling to the end - append new items
        const firstItem = items[0];
        const firstClone = firstItem.cloneNode(true);
        container.appendChild(firstClone);
      }

      // Remove items that are now out of view to prevent excess DOM elements
      if (scrollPosition >= itemWidth * (items.length - visibleItems)) {
        // Remove the first item as it is no longer in view
        container.removeChild(container.firstChild);
      } else if (scrollPosition <= itemWidth * visibleItems) {
        // Remove the last item as it is no longer in view
        container.removeChild(container.lastChild);
      }
    };

    // Create clones and reset position on load
    createClones();
    resetScrollPosition();

    // Monitor scroll for continuity and cleanup
    container.addEventListener("scroll", monitorScroll);
  });
});
