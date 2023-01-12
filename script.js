let inputTxt = document.getElementById("inputTxt");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");

let arrayTodos;
if (localStorage.getItem("saveList") == null) {
    arrayTodos = [];
} else {
    arrayTodos = JSON.parse(localStorage.getItem("saveList"));
}

arrayTodos.forEach(e => {
    let newList = document.createElement("li");
    newList.textContent = e;
    list.appendChild(newList);

    newList.onclick = function () {
        //mengetahui letak array di localStorage
        let indexSaveList = JSON.parse(localStorage.getItem("saveList"));
        let indexTxt = newList.textContent;
        let x = indexSaveList.indexOf(indexTxt);
        //menghapus posisi array di localStorage
        indexSaveList.splice(x, 1);
        localStorage.setItem("saveList", JSON.stringify(indexSaveList));
        newList.remove();
    }

});

addBtn.onclick = function () {
    //create newList
    let newList = document.createElement("li");
    newList.textContent = inputTxt.value;
    list.appendChild(newList);
    //save to localStorage
    arrayTodos.push(inputTxt.value);
    localStorage.setItem("saveList", JSON.stringify(arrayTodos));

    inputTxt.value = "";
}




