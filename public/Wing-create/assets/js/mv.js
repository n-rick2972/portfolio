const mvImage = document.querySelector(".logo-area");
const mvTitle = document.querySelector(".mv-title");
const sub = document.querySelector(".mv-subtitle");

// mv-titleの分割挿入
const mvTextContent = mvTitle.textContent;
const CharArr = mvTextContent.split("");

const charEls = CharArr.map((char) => {
  const charEl = document.createElement("span");
  charEl.textContent = char;
  return charEl;
});

mvTitle.textContent = "";

// image アニメーション
window.setTimeout(() => {
  mvImage.style.opacity = 1;
}, 1000);

window.setTimeout(() => {
  // mv-title アニメーション
  charEls.forEach((charEl) => {
    mvTitle.appendChild(charEl);
  });

  if (window.innerWidth < 430) {
    const br = document.createElement("br");

    mvTitle.insertBefore(br, mvTitle.children[10].nextSibling);
  }

  charEls.forEach((charEl, index) => {
    setTimeout(() => {
      charEl.style.transform = "translateY(0)";
    }, 50 * index);
  });
}, 2000);

// image アニメーション
window.setTimeout(() => {
  sub.style.opacity = 1;
}, 3500);
