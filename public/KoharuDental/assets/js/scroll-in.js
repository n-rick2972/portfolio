const header = document.getElementById("header");

window.addEventListener("scroll", (e) => {
  let height = window.innerHeight;

  if (height < window.scrollY) {
    header.classList.add("view");
  } else {
    header.classList.remove("view");
  }
});
