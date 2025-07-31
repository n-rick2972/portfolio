// mv
const mvSwiper = new Swiper(".swiper", {
  // 以下にオプションを設定
  loop: true, //最後に達したら先頭に戻る
  slidesPerView: "1", //何枚表示するか
  speed: 3000, // スライドアニメーションのスピード（ミリ秒）
  centeredSlides: true,
  autoplay: {
    //自動再生する
    delay: 3000, //次のスライドに切り替わるまでの時間
    disableOnInteraction: false, //ユーザーが操作したら止めるか
    waitForTransition: false, // アニメーションの間にスライドを止めるか
  },
  pagination: {
    el: ".swiper-pagination", // ページネーションのクラス名を指定
    type: "fraction", // ページネーションのtypeを指定
  },
  //ナビゲーションボタン（矢印）表示の設定
  navigation: {
    nextEl: ".swiper-button-next", //「次へボタン」要素のクラス名
    prevEl: ".swiper-button-prev", //「前へボタン」要素のクラス名
  },
});
