// mv

const mvSwiper = new Swiper(".swiper-area .swiper", {
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
  //ナビゲーションボタン（矢印）表示の設定
  navigation: {
    nextEl: ".swiper-button-next.mv-btn", //「次へボタン」要素のクラス名
    prevEl: ".swiper-button-prev.mv-btn", //「前へボタン」要素のクラス名
  },
});

// news&journal(news)
const newsSwiper = new Swiper(".swiper.swiper-content1", {
  // 以下にオプションを設定
  loop: true, //最後に達したら先頭に戻る
  slidesPerView: "auto", //何枚表示するか
  speed: 1000, // スライドアニメーションのスピード（ミリ秒）
  breakpoints: {
    770: {
      spaceBetween: 40,
      slidesPerView: 4, //何枚表示するか
    },
  },
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination1", // ページネーションのクラス名を指定
    type: "fraction", // ページネーションのtypeを指定
  },
  //ナビゲーションボタン（矢印）表示の設定
  navigation: {
    nextEl: ".swiper-button-next1", //「次へボタン」要素のクラス名
    prevEl: ".swiper-button-prev1", //「前へボタン」要素のクラス名
  },
});

// news&journal(journal)
const journalSwiper = new Swiper(".swiper.swiper-content2", {
  // 以下にオプションを設定
  loop: true, //最後に達したら先頭に戻る
  slidesPerView: "auto", //何枚表示するか
  speed: 1000, // スライドアニメーションのスピード（ミリ秒）
  breakpoints: {
    770: {
      spaceBetween: 40,
      slidesPerView: 4, //何枚表示するか
    },
  },
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination2", // ページネーションのクラス名を指定
    type: "fraction", // ページネーションのtypeを指定
  },
  //ナビゲーションボタン（矢印）表示の設定
  navigation: {
    nextEl: ".swiper-button-next2", //「次へボタン」要素のクラス名
    prevEl: ".swiper-button-prev2", //「前へボタン」要素のクラス名
  },
});
