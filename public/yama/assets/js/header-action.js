const actionEl = document.querySelector("header");
const actionEl2 = document.querySelector("h1");

if (window.innerWidth > 480) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      actionEl.style.height = "80px";
      actionEl2.style.width = "20%";
      actionEl2.style.paddingLeft = "5%";
    } else {
      actionEl.style.height = "160px";
      actionEl2.style.width = "25%";
      actionEl2.style.paddingLeft = "0";
    }
  });
}
