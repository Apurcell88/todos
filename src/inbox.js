import { addTaskBtn } from "./index.js";
import { renderTodos } from "./inboxDOM.js";
import { v4 as uuidv4 } from 'uuid';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');

export let todos = getSavedTodos();

renderTodos(todos);

export function deleteTodo(id) {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

function getSavedTodos() {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    }
};

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
                date: '2022-03-04',
            });
            return todos;
        },
    }
}