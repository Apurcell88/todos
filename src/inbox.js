import addTaskBtn from "./index.js";
import { v4 as uuidv4 } from 'uuid';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');

export let todos = [];

export function toggleInboxPopup() {
    const taskPopup = document.querySelector('#add-task-popup');
    addTaskBtn.classList.toggle('hide-display');
    taskPopup.classList.toggle('show-display-flex');
}

// Factory function in charge of inbox todos including creation
export function inboxTodos() {
    return {
        createTodo () {
            todos.push({
                title: title.value,
                priority: priority.value,
                id: uuidv4(),
            });
            return todos;
        },
        deleteTodo () {

        }
    }
}