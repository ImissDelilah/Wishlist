document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".scroll-container");
  const items = container.querySelectorAll(".scroll-container-item");

  if (items.length > 0) {
    let observer;

    // Function to duplicate items
    const duplicateItems = () => {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[items.length - 1].cloneNode(true);

      container.appendChild(firstClone); // Add first clone to the end
      container.insertBefore(lastClone, container.firstChild); // Add last clone to the beginning
    };

    // Add clones initially
    duplicateItems();

    // Observe for continuous duplication
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { target } = entry;

            if (target === container.firstChild) {
              // Add a clone to the start when user scrolls back
              const newLastClone = items[items.length - 1].cloneNode(true);
              container.insertBefore(newLastClone, container.firstChild);
            }

            if (target === container.lastChild) {
              // Add a clone to the end when user scrolls forward
              const newFirstClone = items[0].cloneNode(true);
              container.appendChild(newFirstClone);
            }
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    // Observe the first and last items
    observer.observe(container.firstChild);
    observer.observe(container.lastChild);
  }
});
