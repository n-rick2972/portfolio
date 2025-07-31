const pageTopBtn = document.getElementById("return-top");

pageTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
