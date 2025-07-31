// Helper function to add the active class on an element
const addActive = (element) => {
  element.classList.add("active");
};

// Helper function to remove the active class on an element
const removeActive = (element) => {
  element.classList.remove("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("mouseover", () => {
      addActive(item);
    });

    item.addEventListener("mouseleave", () => {
      removeActive(item);
    });
  });
});
