let inputTxt = document.querySelector(".input-txt");
let colorContainer = document.querySelector(".color-container");
let topBar = document.querySelector(".bar");
let darkMode = document.querySelector(".dark-mode");
let expandColorPicker = document.querySelector(".expand-color-picker");


darkMode.onclick = function () {
    darkMode.classList.toggle("darkModeActive");
}

expandColorPicker.onclick = function () {
    expandColorPicker.classList.toggle("rotateExpandColorPicker");
}

// MENGIKUTI LEBAR inputText
topBar.style.width = inputTxt.clientWidth + "px";
window.addEventListener("resize", function () {
    topBar.style.width = inputTxt.clientWidth + "px";
});

