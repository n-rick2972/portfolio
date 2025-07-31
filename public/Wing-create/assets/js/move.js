// IntersectionObserver制御用設定
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const options2 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

// title制御用アニメーション
const titleTextElements = document.querySelectorAll(".title-text");

titleTextElements.forEach((element) => {
  const titleTextContent = element.textContent.trim();
  const charArray = titleTextContent.split("");
  const charElements = charArray.map((char) => {
    const charElement = document.createElement("span");
    charElement.textContent = char;
    return charElement;
  });

  element.textContent = "";
  charElements.forEach((charElement) => {
    element.appendChild(charElement);
  });

  const sectionTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        charElements.forEach((charElement, index) => {
          setTimeout(() => {
            const pseudoElementStyle = window.getComputedStyle(
              charElement,
              "::before"
            );
            charElement.style.transform = "translateY(0)";
            element.style.setProperty(
              "--pseudo-element-transform",
              "translateY(0)"
            );
          }, 50 * index);
        });
      } else {
        charElements.forEach((charElement, index) => {
          setTimeout(() => {
            const pseudoElementStyle = window.getComputedStyle(
              charElement,
              "::before"
            );
            charElement.style.transform = "translateY(100%)";
            element.style.setProperty(
              "--pseudo-element-transform",
              "translateY(100%)"
            );
          }, 50 * index);
        });
      }
    });
  }, options);

  sectionTitleObserver.unobserve(element);
  sectionTitleObserver.observe(element);
});

// li要素のふわっと動作
const triggers = document.querySelectorAll(".fadeIn__Trigger");
const listElements = document.querySelectorAll(".fadeIn");

triggers.forEach((li) => {
  const listElementsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        listElements.forEach((listElement, i) => {
          setTimeout(() => {
            listElement.style.transform = "translateY(0)";
            listElement.style.opacity = 1;
          }, i * 300);
        });
      } else {
        listElements.forEach((listElement, i) => {
          setTimeout(() => {
            listElement.style.transform = "translateY(10%)";
            listElement.style.opacity = 0;
          }, i * 300);
        });
      }
    });
  }, options2);

  // listElementsObserver.unobserve(li);
  listElementsObserver.observe(li);
});
