let inputTxt = document.querySelector(".input-txt");
let inputDate = document.querySelector('.input-date input');
// CONTAINER
let taskContainer = document.querySelector('.task-container');
let footer = document.querySelector('.footer');
let eachList = document.getElementById('eachList');

function addTodo() {
    if(inputTxt.value == "") {

    }
    else {
        taskContainer.insertAdjacentHTML("beforeend",
        "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>"+inputTxt.value+"</textarea><span id='dateList'>"+inputDate.value+"</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");
        inputTxt.value = "";
    }

    let listWrapper = document.querySelectorAll('.list-wrapper');
    eachList.textContent = "Anda memiliki " +listWrapper.length+ " Todo List";

    let txtList = document.querySelectorAll("#txtList");
    txtList.forEach(e => {
        e.style.cssText = `height: ${e.scrollHeight - 4}px; overflow-y: hidden`;
        e.addEventListener('input', function() {
            e.style.height = "30px";
            e.style.height = this.scrollHeight - 4 + "px";
        });
    });
}
// INPUT
let dateContainer = document.querySelector('.input-date');
dateContainer.style.background = 'crimson';
dateContainer.style.color = 'white';
inputDate.oninput = function () {
    if(inputDate.value) {
        let dateContainer = document.querySelector('.input-date');
        dateContainer.style.background = '#0BB5FF';
        dateContainer.style.color = 'white';
    } else{
        let dateContainer = document.querySelector('.input-date');
        dateContainer.style.background = 'crimson';
        dateContainer.style.color = 'white';
    }
}

// MENU BAR
let task = document.getElementById("task");
let pending = document.getElementById("pending");
let completed = document.getElementById('completed');
function taskMenu(el) {
    el.style.color = "#0BB5FF";
    pending.style.color = "black";
    taskContainer.style.display = "block";
    completed.style.color = 'black';
}
function pendingMenu(el) {
    el.style.color = "#5215FC";
    taskContainer.style.display = "none";
    task.style.color = "black";
    completed.style.color = 'black';
}

function completedMenu(el) {
    task.style.color = 'black';
    pending.style.color = 'black';
    completed.style.color = 'lime';
}

function doneList(el) {
    el.parentElement.parentElement.classList.toggle('doneList');
};  
function deleteList(el) {
    el.parentElement.parentElement.remove();
    let listWrapper = document.querySelectorAll('.list-wrapper');
    eachList.textContent = "Anda memiliki " +listWrapper.length+ " Todo List";
}

//
function darkMode() {
    document.body.classList.toggle('darkModeAll');
}

