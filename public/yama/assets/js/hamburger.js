const humBtn = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

humBtn.addEventListener("click", () => {
  humBtn.classList.toggle("active");
  menu.classList.toggle("active");
});
