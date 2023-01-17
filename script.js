let inputTxt = document.querySelector(".input-txt");
let inputDate = document.querySelector('.input-date input');
// CONTAINER
let taskContainer = document.querySelector('.task-container');
let completedContainer = document.getElementById('completedContainer');
let footer = document.querySelector('.footer');
let eachList = document.getElementById('eachList');

// 
let completedMenu = document.getElementById('completed');
let taskMenu = document.getElementById('task');
taskMenu.onclick = function () {
    completedMenu.style.color = 'black';
    taskMenu.style.color = '#0BB5FF';
    completedContainer.style.display = 'none';
    taskContainer.style.display = 'block';

    let txtList = document.querySelectorAll('#txtList');
    txtList.forEach(txtList => {
        txtList.style.cssText = `height: ${txtList.scrollHeight}px; overflow-y: hidden`;
    });

    for(let i = 1; i <= arrayList.length; i++) {
        eachList.textContent = "Anda mempunyai "+ i +" Todo List";
    }
}
completedMenu.onclick = function () {
    completedMenu.style.color = 'lime';
    taskMenu.style.color = 'black';
    taskContainer.style.display = 'none';
    completedContainer.style.display = 'block';

    let txtList = document.querySelectorAll('#txtList');
    txtList.forEach(txtList => {
        txtList.style.cssText = `height: ${txtList.scrollHeight}px; overflow-y: hidden`;
    });

    for(let i = 1; i <= arrayListCompleted.length; i++) {
        eachList.textContent = "Anda telah menyelesaikan "+ i +" Todo List";
    }
}

// ARRAY LIST LOCAL STORAGE
let arrayList;
if (localStorage.getItem('saveList') == null) {
    localStorage.setItem('saveList', "[]");
} else {
    arrayList = JSON.parse(localStorage.getItem('saveList'));
}

let arrayListCompleted;
if (localStorage.getItem('saveListCompleted') == null) {
    localStorage.setItem('saveListCompleted', "[]");
} else {
    arrayListCompleted = JSON.parse(localStorage.getItem('saveListCompleted'));
}
for(let i = 1; i <= arrayList.length; i++) {
    eachList.textContent = "Anda mempunyai "+ i +" Todo List";
}
// MOVE TO COMPLETED TASK
arrayList.forEach(e => {
    if (e.doneList == true) {
        arrayListCompleted.push(e);
    }
    localStorage.setItem('saveListCompleted', JSON.stringify(arrayListCompleted));
})
for (let i = 0; i < arrayList.length; i++) {
    if (arrayList[i].doneList === true) {
        arrayList.splice(i, 1);
        i--;
    }
    localStorage.setItem('saveList', JSON.stringify(arrayList));
}
// LIST COMPLETED
arrayListCompleted.forEach(e => {
    completedContainer.insertAdjacentHTML("beforeend",
        "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + e.txtList + "</textarea><span id='dateList'>" + e.date + "</span></div><div class='setting-list'><span onclick='doneListCompleted(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteListCompleted(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");

});
let listWrapperCompleted = document.querySelectorAll('.list-wrapper');
for (let i = 0; i <= arrayListCompleted.length - 1; i++) {
    if (arrayListCompleted[i].doneList == true) {
        listWrapperCompleted[i].classList.add('doneList');
    }
}
function doneListCompleted(el) {
    let doneListCompletedParent = el.parentElement.parentElement;
    doneListCompletedParent.classList.toggle('doneList');

    let clickArrayDoneCompletedList = Array.from(listWrapperCompleted).indexOf(doneListCompletedParent);

    if (listWrapperCompleted[clickArrayDoneCompletedList].classList.contains('doneList')) {
        arrayListCompleted[clickArrayDoneCompletedList].doneList = true;
    } else {
        arrayListCompleted[clickArrayDoneCompletedList].doneList = false;
    }
    localStorage.setItem('saveListCompleted', JSON.stringify(arrayListCompleted));


    if (arrayListCompleted[clickArrayDoneCompletedList].doneList == false) {
        window.addEventListener('beforeunload', () => {
            arrayList.push(arrayListCompleted[clickArrayDoneCompletedList])
            arrayListCompleted.splice(clickArrayDoneCompletedList, 1);
            localStorage.setItem('saveList', JSON.stringify(arrayList));
            localStorage.setItem('saveListCompleted', JSON.stringify(arrayListCompleted));
        });
    }

}

function deleteListCompleted(el) {
    let deleteListCompletedParent = el.parentElement.parentElement;
    
    let allOfListWrapper = document.querySelectorAll('#completedContainer .list-wrapper');
    let indexOfDeleteListParent = Array.from(allOfListWrapper).indexOf(deleteListCompletedParent);
    deleteListCompletedParent.remove();
    arrayListCompleted.splice(indexOfDeleteListParent, 1);
    console.log(indexOfDeleteListParent);
    localStorage.setItem('saveListCompleted', JSON.stringify(arrayListCompleted));
    for(let i = 0; i <= arrayListCompleted.length; i++) {
        eachList.textContent = "Anda telah menyelesaikan " +i+ " Todo List";
    }
}
// 
let arrayListParse = JSON.parse(localStorage.getItem('saveList'));
arrayListParse.forEach(e => {
    taskContainer.insertAdjacentHTML("beforeend",
        "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + e.txtList + "</textarea><span id='dateList'>" + e.date + "</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");
    //
});

for (let i = 0; i <= arrayList.length - 1; i++) {
    let dateList = new Date(arrayList[i].datePicker).getDate();
    let dateNow = new Date().getDate();
    if (dateList == dateNow) {
        arrayList[i].date = "Hari ini";
    } else if (dateList == (dateNow + 1)) {
        arrayList[i].date = "Besok";
    } else if (dateList == (dateNow - 1)) {
        arrayList[i].date = "Kemarin";
    } else {
        arrayList[i].date = arrayList[i].datePicker;
    }
    localStorage.setItem('saveList', JSON.stringify(arrayList));
}

let listWrapperArray = Array.from(document.querySelectorAll('.list-wrapper'));
let activeUsers = arrayList.filter(user => user.doneList === true);
activeUsers.forEach((user, i) => user.index = arrayList.findIndex(u => u === user));
activeUsers.forEach(e => {
    listWrapperArray[e.index].classList.add('doneList');
});
// INPUT TEXT
window.addEventListener('load', function () {
    // 
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
                if (clickArrayPostion.txtList.trim() == "") {
                    arrayList.splice(clickArrayList, 1);
                    localStorage.setItem('saveList', JSON.stringify(arrayList));
                }
            });

            this.style.height = '30px';
            this.style.height = `${this.scrollHeight - 4}px`;
        })
    });
    let listWrapper = document.querySelectorAll('.task-container .list-wrapper').length;
eachList.textContent = "Anda mempunyai " +listWrapper+ " Todo List";
});
// ADD TODO LIST
function addTodo(el) {

    if (inputTxt.value.trim() == "") {
        eachList.textContent = "Silahkan isi Todo List terlebih dahulu";
    }
    else {
        // SAVE TO LOCAL STORAGE
        arrayList.push(
            { 'txtList': inputTxt.value, 'date': '', 'datePicker': inputDate.value, 'doneList': false }
        );
        for (let i = 0; i <= arrayList.length - 1; i++) {
            let dateList = new Date(arrayList[i].datePicker).getDate();
            let dateNow = new Date().getDate();
            if (dateList == dateNow) {
                arrayList[i].date = "Hari ini";
            } else if (dateList == (dateNow + 1)) {
                arrayList[i].date = "Besok";
            } else if (dateList == (dateNow - 1)) {
                arrayList[i].date = "Kemarin";
            } else {
                arrayList[i].date = arrayList[i].datePicker;
            }
            localStorage.setItem('saveList', JSON.stringify(arrayList));
        }

        let x = arrayList.length - 1;
        taskContainer.insertAdjacentHTML("beforeend",
            "<div class='list-wrapper'><div class='line-color'></div><div class='text-list'><textarea id='txtList' spellcheck='false'>" + inputTxt.value + "</textarea><span id='dateList'>" + arrayList[x].date + "</span></div><div class='setting-list'><span onclick='doneList(this)' class='done material-symbols-outlined'>done</span><span onclick='deleteList(this)' class='delete material-symbols-outlined' style='background: crimson;'>delete</span></div></div>");
        localStorage.setItem('saveList', JSON.stringify(arrayList));
        inputTxt.value = '';

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
                    if (clickArrayPostion.txtList.trim() == "") {
                        arrayList.splice(clickArrayList, 1);
                        localStorage.setItem('saveList', JSON.stringify(arrayList));
                    }
                });
                this.style.height = '30px';
                this.style.height = `${this.scrollHeight - 4}px`;
            })
        });
    }
    for(let i = 1; i <= arrayList.length; i++) {
        eachList.textContent = "Anda mempunyai "+ i +" Todo List";
    }
    if(completedContainer.style.display == 'block') {
        setTimeout(function() {
            location.reload();
        }, 50)
    }
}

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
    //
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
    for(let i = 0; i <= arrayList.length; i++) {
        eachList.textContent = "Anda mempunyai "+ i +" Todo List";
    }

}
// DARK MODE
function darkMode() {
    document.body.classList.toggle('darkModeAll');
    if(document.body.classList.contains('darkModeAll') == true) {
        localStorage.setItem('darkModeAll', 'darkModeAll');
    } else {
        localStorage.removeItem('darkModeAll');
    }
}
if(localStorage.getItem('darkModeAll') == 'darkModeAll') {
    document.body.classList.add('darkModeAll')
} else {
    document.body.classList.remove('darkModeAll');
}
