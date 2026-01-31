(() => {
  const slides = Array.from(document.querySelectorAll('.js-slide'));
  const btnPrev = document.querySelector('.js-prev');
  const btnNext = document.querySelector('.js-next');

  if (slides.length === 0) return;

  // スライド番号（0-based）
  let slideIndex = 0;

  // 各スライドの「何手目まで進んだか」
  const stepIndexBySlide = new Array(slides.length).fill(0);

  const actionsIn = (slideEl) =>
    Array.from(slideEl.querySelectorAll('.js-action'));

  const showOnly = () => {
    slides.forEach((el, i) => {
      el.style.display = i === slideIndex ? '' : 'none';
    });

    const current = slides[slideIndex];
    const actions = actionsIn(current);
    const step = stepIndexBySlide[slideIndex];

    actions.forEach((el, idx) => {
      el.classList.toggle('action', idx < step);
    });

    // #8 みたいにハッシュへ反映（リロード復帰が楽）
    history.replaceState(null, '', `#${slideIndex + 1}`);
  };

  const goToSlide = (nextIndex, preset = 'keep') => {
    slideIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));

    if (preset === 'start') stepIndexBySlide[slideIndex] = 0;
    if (preset === 'end')
      stepIndexBySlide[slideIndex] = actionsIn(slides[slideIndex]).length;

    showOnly();
  };

  const next = () => {
    const current = slides[slideIndex];
    const actions = actionsIn(current);
    const step = stepIndexBySlide[slideIndex];

    if (step < actions.length) {
      stepIndexBySlide[slideIndex] = step + 1;
      showOnly();
    } else if (slideIndex < slides.length - 1) {
      goToSlide(slideIndex + 1, 'start');
    }
  };

  const prev = () => {
    const current = slides[slideIndex];
    const step = stepIndexBySlide[slideIndex];

    if (step > 0) {
      stepIndexBySlide[slideIndex] = step - 1;
      showOnly();
    } else if (slideIndex > 0) {
      // 戻るときは「前スライドは全部出た状態」にするのが発表だと自然
      goToSlide(slideIndex - 1, 'end');
    }
  };

  // ボタン操作
  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);

  // キーボード操作
  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      next();
    }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prev();
    }
  });

  // クリックで進む（発表で地味に便利）※不要なら消してOK
  window.addEventListener('click', (e) => {
    // ナビボタンのクリックは除外
    if (e.target.closest('.deck-nav')) return;
    next();
  });

  // 初期スライド（URLハッシュ #3 なら3枚目）
  const hash = Number(window.location.hash.replace('#', ''));
  if (Number.isFinite(hash) && hash >= 1 && hash <= slides.length) {
    slideIndex = hash - 1;
  }

  showOnly();
})();
