let inputTxt = document.querySelector(".input-txt");
let inputDate = document.querySelector('.input-date input');
// CONTAINER
let taskContainer = document.querySelector('.task-container');
let footer = document.querySelector('.footer');
let eachList = document.getElementById('eachList');

// ARRAY LIST LOCAL STORAGE
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

let listWrapperArray = Array.from(document.querySelectorAll('.list-wrapper'));
let activeUsers = arrayList.filter(user => user.doneList === true);
activeUsers.forEach((user, i) => user.index = arrayList.findIndex(u => u === user));
activeUsers.forEach(e => {
    listWrapperArray[e.index].classList.add('doneList');
});

// INPUT TEXT
window.addEventListener('load', function () {
    let txtList = document.querySelectorAll('#txtList');
    txtList.forEach(txtList => {
        txtList.style.cssText = `height: ${txtList.scrollHeight - 4}px; overflow-y: hidden`;
        txtList.addEventListener('input', function () {
            let txtListParent = txtList.parentElement.parentElement;
            let listWrapper = document.querySelectorAll('.list-wrapper'); // all of list-wrapper
            let clickArrayList = Array.from(listWrapper).indexOf(txtListParent); // knowing where the array number
            arrayList[clickArrayList].txtList = txtList.value;
            localStorage.setItem('saveList', JSON.stringify(arrayList));

            window.addEventListener('beforeunload', function () {
                let clickArrayPostion = arrayList[clickArrayList];
                if(clickArrayPostion.txtList.trim() == "") {
                    arrayList.splice(clickArrayList, 1);
                    localStorage.setItem('saveList', JSON.stringify(arrayList));
                }
            });

            this.style.height = '30px';
            this.style.height = `${this.scrollHeight - 4}px`;
        })
    });
});

// ADD TODO LIST
function addTodo(el) {
    if (inputTxt.value.trim() == "") {
        eachList.textContent = "Todo Listnya di isi dulu bre";
    }
    else {
        taskContainer.insertAdjacentHTML("beforeend",
            "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + inputTxt.value + "</textarea><span id='dateList'>" + inputDate.value + "</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");

        // SAVE TO LOCAL STORAGE
        arrayList.push(
            { 'txtList': inputTxt.value, 'date': inputDate.value, 'doneList': false }
        );
        localStorage.setItem('saveList', JSON.stringify(arrayList));
        inputTxt.value = '';
        //
        let listWrapper = document.querySelectorAll('.list-wrapper').length;
        eachList.textContent = 'Anda memiliki ' + listWrapper + ' Todo List';

        let txtList = document.querySelectorAll('#txtList');
        txtList.forEach(txtList => {
            txtList.style.cssText = `height: ${txtList.scrollHeight - 4}px; overflow-y: hidden`;
            txtList.addEventListener('input', function () {
                let txtListParent = txtList.parentElement.parentElement;
                let listWrapper = document.querySelectorAll('.list-wrapper'); // all of list-wrapper
                let clickArrayList = Array.from(listWrapper).indexOf(txtListParent); // knowing where the array number
                arrayList[clickArrayList].txtList = txtList.value;
                localStorage.setItem('saveList', JSON.stringify(arrayList));

                window.addEventListener('beforeunload', function () {
                    let clickArrayPostion = arrayList[clickArrayList];
                    if(clickArrayPostion.txtList.trim() == "") {
                        arrayList.splice(clickArrayList, 1);
                        localStorage.setItem('saveList', JSON.stringify(arrayList));
                    }
                });

                this.style.height = '30px';
                this.style.height = `${this.scrollHeight}px`;
            })
        });
    }
}
// MENGHITUNG JUMLAH LIST WRAPPER SAAT WEB DI REFRESH
let listWrapper = document.querySelectorAll('.list-wrapper').length;
eachList.textContent = 'Anda memiliki ' + listWrapper + ' Todo List';

// INPUT DATE
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

// DONE LIST
function doneList(el) {
    let doneListParent = el.parentElement.parentElement;
    doneListParent.classList.toggle('doneList');
    // 
    let listWrapper = document.querySelectorAll('.list-wrapper'); // all of list-wrapper
    let clickArrayDoneList = Array.from(listWrapper).indexOf(doneListParent); // knowing where the array number
    if (doneListParent.classList.contains('doneList')) {
        arrayList[clickArrayDoneList].doneList = true;
    } else {
        arrayList[clickArrayDoneList].doneList = false;
    }
    localStorage.setItem('saveList', JSON.stringify(arrayList));
};

// DELETE LIST
function deleteList(el) {
    let listWrapper = document.querySelectorAll('.list-wrapper'); // all of list-wrapper
    let deleteListParent = el.parentElement.parentElement; // parent of delete list (list-wrapper)
    let clickArrayDeleteList = Array.from(listWrapper).indexOf(deleteListParent); // knowing where the array number
    arrayList.splice(clickArrayDeleteList, 1); // delete array from localStorage
    localStorage.setItem('saveList', JSON.stringify(arrayList)); // save list
    deleteListParent.remove(); // remove list
    // COUNTING LIST WRAPPER
    eachList.textContent = "Anda memiliki " + (listWrapper.length - 1) + " Todo List";
}

// DARK MODE
function darkMode() {
    document.body.classList.toggle('darkModeAll');
}
