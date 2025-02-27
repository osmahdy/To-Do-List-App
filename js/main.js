let input = document.querySelector(`.app .add-section input`);
let addBtn = document.querySelector(`.app .add-section .add`);
let delBtn = document.querySelector(`.app .add-section .del`);
let listSection = document.querySelector(`.app .list-section`);
let messege = document.querySelector(`.app .list-section .messege`);

let i = 0;
let j = 0;
let tasksArray = [];

input.addEventListener('keydown', (k) => {
  if (k.key === 'Enter') {
    addBtn.click();
  }
});

if (window.localStorage.getItem('tasks')) {
  tasksArray = JSON.parse(window.localStorage.getItem('tasks'));
}

getFromLocal();

delBtn.addEventListener('click', () => {
  localStorage.clear();
  listSection.innerHTML = '<span class="messege">There Is No Notes Yet ....</span>';
});

addBtn.addEventListener('click', () => {
  if (input.value != '') {
    addTaskToArray(input.value);
    input.value = '';
  }
});

listSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    //remove from page
    e.target.parentElement.remove();
    //remove from local storage
    deleteFromLocal(e.target.parentElement.dataset.id);
  }
});

function addTaskToArray(dataText) {
  let data = {
    id: i,
    text: dataText,
    completed: false,
  };
  tasksArray.push(data);
  creatElement(dataText);
  addtoLocalStorage(tasksArray);

  i++;
}

function creatElement(dataText) {
  messege.style.display = 'none';
  let note = document.createElement('div');
  let text = document.createElement('span');
  let btn = document.createElement('button');
  note.className = 'note';
  text.className = 'text';
  btn.className = 'btn';
  btn.textContent = 'Delete';
  text.textContent = dataText;
  note.dataset.id = j;
  note.appendChild(text);
  note.appendChild(btn);
  listSection.appendChild(note);
  j++;
}

function addtoLocalStorage(tasksArray) {
  window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function deleteFromLocal(id) {
  console.log(id);
  tasksArray.splice(id, 1);
  localStorage.clear();
  addtoLocalStorage(tasksArray);
}

function getFromLocal() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let task = JSON.parse(data);
    let taskArr = Array.from(task);
    taskArr.forEach((tsk) => {
      creatElement(tsk.text);
    });
  }
}
let footerYear = document.querySelector(`footer .year`);
let date = new Date();
footerYear.textContent = date.getFullYear();