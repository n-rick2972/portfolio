const el = document.getElementById("js-hamburger");
const text = document.getElementById("js-change");
const menu = document.getElementById("js-menu");

el.addEventListener("click", () => {
  el.classList.toggle("active");
  menu.classList.toggle("active");
  if (text.innerText === "MENU") {
    text.innerText = "CLOSE";
  } else {
    text.innerText = "MENU";
  }
});
