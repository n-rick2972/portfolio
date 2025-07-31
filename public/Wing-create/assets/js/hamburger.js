const hamBtn = document.getElementById("hamburger");
const nav = document.getElementById("js-open");

hamBtn.addEventListener("click", () => {
  if (hamBtn.classList.contains("active")) {
    hamBtn.classList.remove("active");
    nav.classList.remove("active");
  } else {
    hamBtn.classList.add("active");
    nav.classList.add("active");
  }
});
