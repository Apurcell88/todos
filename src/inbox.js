import addTaskBtn from "./index.js";

let todos = [];
// const title = document.querySelector('#todo-to-add-text');

export function loadInboxPopup() {
    const taskPopup = document.querySelector('#add-task-popup');
    addTaskBtn.classList.add('hide-display');
    taskPopup.classList.add('show-display-flex');
}

// Factory function in charge of inbox todos including creation
export function inboxTodos() {
    const title = document.querySelector('#todo-to-add-text');
    const description = document.querySelector('[data-description]');
    const priority = document.querySelector('[data-priority]');

    return {
        createTodo () {
            todos.push({
                title: title.value,
                description: description.value,
                priority: priority.value,
                // id: '',
            });
            return todos;
        }
    }
}

export default todos;