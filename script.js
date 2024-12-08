document.addEventListener("DOMContentLoaded", () => {
  const scrollContainers = document.querySelectorAll(".scroll-container");

  scrollContainers.forEach((container) => {
    const createClones = () => {
      const items = container.querySelectorAll(".scroll-container-item");

      // Clone all items once to prepend and append
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
      const originalItemsStart = items.length / 3; // Skips the first set of prepended clones
      container.scrollLeft = originalItemsStart * itemWidth - containerWidth / 2;
    };

    // Monitor scroll position to detect when to adjust
    const monitorScroll = () => {
      const items = container.querySelectorAll(".scroll-container-item");
      const itemWidth = items[0].offsetWidth;
      const totalItems = items.length;
      const visibleItems = totalItems / 3; // Original + 2 clones

      // Adjust scroll position only when reaching the ends
      if (container.scrollLeft < itemWidth * visibleItems) {
        // When scrolled near the beginning, move to the middle set of items
        container.scrollLeft += visibleItems * itemWidth;
      } else if (container.scrollLeft > itemWidth * 2 * visibleItems) {
        // When scrolled near the end, move back to the middle set of items
        container.scrollLeft -= visibleItems * itemWidth;
      }
    };

    // Initial setup
    createClones();
    resetScrollPosition();

    // Monitor scroll to adjust for continuous looping
    container.addEventListener("scroll", monitorScroll);
  });
});
