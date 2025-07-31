// const target = document.getElementById("target");
// let targetRect = target.getBoundingClientRect().top;
// const toggleElement = document.getElementById("return-top");

// console.log(targetRect);

window.onscroll = () => {
  const target = document.getElementById("target");
  const toggleElement = document.getElementById("return-top");

  var clientRect = target.getBoundingClientRect().top;

  if (clientRect < 0) {
    toggleElement.classList.add("view");
  } else {
    toggleElement.classList.remove("view");
  }
};
