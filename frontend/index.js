import api from './api.js';

const taskControl = document.querySelector('.task-control');
const taskError = document.querySelector('.task-error');
const addBtn = document.querySelector('.add-btn');
const container = document.querySelector('.container');
const noTask = document.querySelector('.no-task');
const loading = document.getElementById('loading');

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const tasks = await api.getAllTasks();
        displayTasks(tasks);
    }catch(err){
        console.error(err);
    }
});

addBtn.addEventListener('click', () => createTask(taskControl.value));
taskControl.addEventListener('keyup', (event) => event.key === "Enter" && createTask(taskControl.value));

function displayTasks(tasks){
    loading.style.display = "none";
    const isValid = Object.keys(tasks).length !== 0;
    if(isValid){
        tasks.forEach(task => addTask(task));
    }else{
        noTask.style.display = "block";
    }
}

function addTask(item) {
    const regexp = /\w+/g;
    const isValid = regexp.test(item.task);
    if (isValid) {
        taskError.style.display = "none";
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card mb-3');
        wrapper.setAttribute('id', item._id);
        const task = document.createElement('div');
        task.setAttribute("class", "card-body");
        task.innerHTML = `<div id="task${item._id}">${item.task}</div> <div><i class="bi bi-pen"></i><i class="bi bi-trash"></i></div>`;
        task.addEventListener('click', (event) => {
            const target = event.target.className;
            const input = task.querySelector(`#task${item._id}`);
            if (target.endsWith("pen")) {
                editTask(input);
            } else if (target.endsWith("trash")) {
                deleteTask(item._id, wrapper);
            }
        });
        wrapper.appendChild(task);
        container.appendChild(wrapper);
    } else {
        showError();
    }
}
async function createTask(value){
    const regexp = /\w+/g;
    const isValid = regexp.test(value);
    if(isValid){
        try{
            const result = await api.createNewTask(value);
            addTask(result);
        }catch(err){
            console.error(err);
        }
    }else{
        showError();
    }
}
function editTask(input) {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(input);
    selection.removeAllRanges();
    selection.addRange(range);
    input.contentEditable = true;
    input.style.outline = 'none';
    input.focus();
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            updateTask(input);
        }
    });
}
async function deleteTask(id, wrapper) {
    try{
        await api.deleteTask(id);
        wrapper.remove();
    }catch(err){
        console.error(err);
    }
}
async function updateTask(input) {
    input.contentEditable = false;
    const id = input.id.replace('task','');
    const value = input.textContent;
    try{
        const result = await api.updateTask(id, value);
        input.textContent = result.task;
    }catch(err){
        console.error(err);
    }
}
function showError() {
    taskError.style.display = "block";
}
