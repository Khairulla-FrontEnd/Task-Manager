import { environment } from "./environments/environment.js";

const apiKey = environment.apiKey;
const taskControl = document.querySelector('.task-control');
const taskError = document.querySelector('.task-error');
const addBtn = document.querySelector('.add-btn');
const container = document.querySelector('.container');

let id = -1;

addBtn.addEventListener('click', () => addTask());
taskControl.addEventListener('keyup', (event) => event.key === "Enter" && addTask());

function addTask() {
    const regexp = /\w+/g;
    const isValid = regexp.test(taskControl.value);
    if (isValid) {
        taskError.style.display = "none";
        id += 1;
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'card mb-3');
        wrapper.setAttribute('id', id);
        const task = document.createElement('div');
        task.setAttribute("class", "card-body");
        task.innerHTML = `<div id="task${id}">${taskControl.value}</div> <div><i class="bi bi-pen"></i><i class="bi bi-trash"></i></div>`;
        task.addEventListener('click', (event) => {
            const target = event.target.className;
            const input = task.querySelector(`#task${id}`);
            if (target.endsWith("pen")) {
                editTask(input);
            } else if (target.endsWith("trash")) {
                deleteTask(wrapper);
            }
        });
        wrapper.appendChild(task);
        container.appendChild(wrapper);
        taskControl.value = "";
    } else {
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
function deleteTask(wrapper) {
    wrapper.remove();
}
function updateTask(input) {
    input.contentEditable = false;
}
function showError() {
    taskError.style.display = "block";
}
