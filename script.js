let inputTxt = document.querySelector(".input-txt");
let inputDate = document.querySelector('.input-date input');
// CONTAINER
let listContainer = document.querySelector('.list-container');
let footer = document.querySelector('.footer');
let eachList = document.getElementById('eachList');

function addTodo() {
    if(inputTxt.value == "") {

    }
    else {
        listContainer.insertAdjacentHTML("afterbegin",
        "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>"+inputTxt.value+"</textarea><span id='dateList'>"+inputDate.value+"</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");
        inputTxt.value = "";
    }

    let listWrapper = document.querySelectorAll('.list-wrapper');
    eachList.textContent = listWrapper.length;

    let txtList = document.getElementById("txtList");
    txtList.addEventListener("input", function() {
        this.style.height = "30px";
        this.style.height = this.scrollHeight - 4 + "px";
      });
}


function doneList(el) {
    el.parentElement.parentElement.classList.toggle('doneList');
};  
function deleteList(el) {
    el.parentElement.parentElement.remove();
    let listWrapper = document.querySelectorAll('.list-wrapper');
    eachList.textContent = listWrapper.length;
}

//
function darkMode() {
    document.body.classList.toggle('darkModeAll');
}

function expand() {
    document.querySelector('.expand-color-picker').classList.toggle('rotateExpandColorPicker');
    document.querySelector('.color-wrapper').classList.toggle('colorWrapperMove');
}
