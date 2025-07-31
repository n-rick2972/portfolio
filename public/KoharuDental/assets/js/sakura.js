// 桜の画像ファイルのパス
const sakuraImages = ["./assets/img/sakura1.png", "./assets/img/sakura2.png"];

// 桜の舞い演出
function createSakura() {
  const container = document.getElementById("sakura-container");

  // ビューポートの高さと幅を取得
  const viewportWidth = container.clientWidth;
  const viewportHeight = container.clientHeight;

  // ランダムな秒数で桜が舞い降りるアニメーションを作成
  const duration = Math.random() * 10 + 10; // 10から20秒の間でランダム

  // ランダムな大きさの桜の画像を選択
  const imageIndex = Math.floor(Math.random() * sakuraImages.length);
  const imageUrl = sakuraImages[imageIndex];

  // ランダムな大きさを生成（幅と高さを0.3から1.5倍の間でランダムに調整）
  const size = Math.random() * 5 + 1;

  // 桜の初期位置と大きさを設定
  const initialX = Math.random() * (viewportWidth / 2);
  const initialY = Math.random() * (viewportHeight / 3);

  // 桜の要素を作成
  const sakura = document.createElement("div");
  sakura.classList.add("sakura");
  sakura.style.backgroundImage = `url(${imageUrl})`;
  sakura.style.width = `${30 * size}px`;
  sakura.style.height = `${30 * size}px`;
  sakura.style.left = `${initialX}px`;
  sakura.style.top = `${initialY}px`;

  // アニメーションを適用
  sakura.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)` },
      {
        transform: `translate(${viewportWidth}px, ${viewportHeight}px) rotate(1080deg)`,
      },
    ],
    {
      duration: duration * 1000, // ミリ秒単位で指定
      easing: "linear",
      iterations: Infinity,
    }
  );

  // 桜を追加
  container.appendChild(sakura);
}

// 桜を複数作成
function createMultipleSakura(count) {
  for (let i = 0; i < count; i++) {
    createSakura();
  }
}

// ページがロードされたときに実行
window.onload = function () {
  // 桜の数を指定して作成
  createMultipleSakura(20);
};
