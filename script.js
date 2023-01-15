let inputTxt = document.querySelector(".input-txt");
let inputDate = document.querySelector('.input-date input');
// CONTAINER
let taskContainer = document.querySelector('.task-container');
let footer = document.querySelector('.footer');
let eachList = document.getElementById('eachList');

let arrayList;
if (localStorage.getItem('saveList') == null) {
    localStorage.setItem('saveList', "[]");
} else {
    arrayList = JSON.parse(localStorage.getItem('saveList'));
}

let arrayListParse = JSON.parse(localStorage.getItem('saveList'));
arrayListParse.forEach(e => {
    taskContainer.insertAdjacentHTML("beforeend",
        "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + e.txtList + "</textarea><span id='dateList'>" + e.date + "</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");

});

function addTodo() {
    if (inputTxt.value == "") {

    }
    else {
        taskContainer.insertAdjacentHTML("beforeend",
            "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + inputTxt.value + "</textarea><span id='dateList'>" + inputDate.value + "</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");
    }

    let listWrapper = document.querySelectorAll('.list-wrapper');
    eachList.textContent = "Anda memiliki " + listWrapper.length + " Todo List";

    let txtList = document.querySelectorAll("#txtList");
    txtList.forEach(e => {
        e.style.cssText = `height: ${e.scrollHeight - 4}px; overflow-y: hidden`;
        e.addEventListener('input', function () {
            e.style.height = "30px";
            e.style.height = this.scrollHeight - 4 + "px";
        });
    });

    // SAVE TO LOCAL STORAGE
    arrayList.push(
        { 'txtList': inputTxt.value, 'date': inputDate.value, 'doneList': false }
    );
    localStorage.setItem('saveList', JSON.stringify(arrayList));
}
// INPUT
let dateContainer = document.querySelector('.input-date');
dateContainer.style.background = 'crimson';
dateContainer.style.color = 'white';
inputDate.oninput = function () {
    if (inputDate.value) {
        let dateContainer = document.querySelector('.input-date');
        dateContainer.style.background = '#0BB5FF';
        dateContainer.style.color = 'white';
    } else {
        let dateContainer = document.querySelector('.input-date');
        dateContainer.style.background = 'crimson';
        dateContainer.style.color = 'white';
    }
}

function doneList(el) {
    el.parentElement.parentElement.classList.toggle('doneList');
};

function deleteList(el) {

}

//
function darkMode() {
    document.body.classList.toggle('darkModeAll');
}

