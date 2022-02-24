import { addTaskBtn, getSavedInboxTodos } from "./index.js";
import { v4 as uuidv4 } from 'uuid';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');

export let todos = JSON.parse(localStorage.getItem('todos')) || [];

export function deleteTodo(id) {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

export function toggleInboxPopup() {
    const taskPopup = document.querySelector('#add-task-popup');
    addTaskBtn.classList.toggle('hide-display');
    // deleteTodoBtn.classList.toggle('hide-display');
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
                completed: false,
            });
            return todos;
        },
    }
}