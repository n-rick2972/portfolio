$(window).on('load', function () {
  $('#loading').delay(2300).fadeOut(500);
  $('#gif').delay(2000).fadeOut(500);
});

window.addEventListener('scroll', function () {
  if (document.documentElement.clientHeight < window.scrollY) {
    document.getElementById('js-header').classList.add('fixed');
  } else {
    document.getElementById('js-header').classList.remove('fixed');
  }
});

const btn = document.getElementById('js-hamburger');
const header = document.getElementById('js-header');
const nav = document.getElementById('js-nav');

const hamburgerAction = () => {
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    header.classList.remove('active');
    nav.classList.remove('active');
  } else {
    btn.classList.add('active');
    header.classList.add('active');
    nav.classList.add('active');
  }
};

btn.addEventListener('click', hamburgerAction);

if ($(window).width() <= 520) {
  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop(); // スクロール上部の位置
    let areaTop = $('#js-scroll').offset().top; // 対象エリアの上部の位置
    let areaBottom = areaTop + $('#js-scroll').innerHeight(); // 対象エリアの下部の位置

    if (scrollTop > areaTop && scrollTop < areaBottom) {
      $('#js-lock').addClass('active'); // スクロールが対象エリアに入った場合
    } else {
      $('#js-lock').removeClass('active'); // スクロールが対象エリアから出ている場合
    }
  });
}
