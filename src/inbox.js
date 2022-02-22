import { addTaskBtn, deleteTodoBtn } from "./index.js";
import { v4 as uuidv4 } from 'uuid';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');

export let todos = [];

export function toggleInboxPopup() {
    const taskPopup = document.querySelector('#add-task-popup');
    addTaskBtn.classList.toggle('hide-display');
    deleteTodoBtn.classList.toggle('hide-display');
    taskPopup.classList.toggle('show-display-flex');
}

// Factory function in charge of inbox todos including creation
export function inboxTodos() {
    // const todoToDel;
    return {
        createTodo() {
            todos.push({
                title: title.value,
                priority: priority.value.toLowerCase(),
                id: uuidv4(),
                complete: false,
            });
            return todos;
        },
        deleteTodo() {
            todos.forEach((todo) => {
            //     if (todo. ) {
                console.log(todo);
            //     }
            });
            // todoToDel = todos.indexOf(id)
            // todos.splice(index, 1);
        },
        editTodo() {

        }
    }
}