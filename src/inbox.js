import { addTaskBtn } from "./index.js";
import { renderTodos } from "./inboxDOM.js";
import { v4 as uuidv4 } from 'uuid';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');
export const date = document.querySelector('[data-date]');

// export let todos = getSavedStorage('todos');
export let todos = {}

renderTodos(todos);

export function deleteItem(id, array) {
    const itemIndex = array.findIndex((todo) => {
        return todo.id === id;
    });

    if (itemIndex > -1) {
        array.splice(itemIndex, 1);
    }
}

export function getSavedStorage(savedStorage) {
    const todosJSON = localStorage.getItem(savedStorage);

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
};

export function toggleInboxPopup(element, btn) {
    const taskPopup = document.querySelector(element);
    btn.classList.toggle('hide-display');
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
                date: date.value,
            });
            return todos;
        },
    }
}