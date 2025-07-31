
const submitElement = document.getElementsByClassName('wpcf7-submit');
const submitValue = submitElement[0].value;

submitElement[0].addEventListener('click', (ev) => {
    submitElement[0].classList.add('wpcf7-active'); // 指定のクラスを付与する
    submitElement[0].value = '送信中…'; // 送信中の文言(*1)
});

document.addEventListener('wpcf7submit', (ev) => { // Ajaxのフォーム送信が完了した場合（成功・失敗問わず）
    submitElement[0].classList.remove('wpcf7-active'); // 指定のクラスを外す
    submitElement[0].value = submitValue;
});