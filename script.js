let inputTxt = document.querySelector(".input-txt");
let colorContainer = document.querySelector(".color-container");

function darkMode() {
    document.querySelector('.dark-mode').classList.toggle("darkModeActive");
    document.body.classList.toggle('darkModeAll');
}

function expand() {
    document.querySelector('.expand-color-picker').classList.toggle('rotateExpandColorPicker');
    document.querySelector('.color-wrapper').classList.toggle('colorWrapperMove');
}
// MENGIKUTI LEBAR inputText
let topBar = document.querySelector(".bar");
topBar.style.width = inputTxt.clientWidth + "px";
window.addEventListener("resize", function () {
    topBar.style.width = inputTxt.clientWidth + "px";
});

