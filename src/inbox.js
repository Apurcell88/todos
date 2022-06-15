import { v4 as uuidv4 } from 'uuid';
import { projects } from './addProject';
import { incompleteTodos } from './addProjectDOM';

export const title = document.querySelector('#todo-to-add-text');
export const priority = document.querySelector('[data-priority]');
export const date = document.querySelector('[data-date]');
export const placeTodo = document.querySelector('[data-place-todo]') // just added

export function deleteItem(id, array) {
    const itemIndex = array.findIndex((todo) => {
        return todo.id === id;
    });

    if (itemIndex > -1) {
        array.splice(itemIndex, 1);
    }
}

export function deleteTodo(todoId, projectId) {

    const projectIndex = projects.findIndex((project) => {
        return project.id === projectId
    })

    const todoIndex = projects[projectIndex].tasks.findIndex((todo) => {
        return todo.id === todoId;
    });
    
    if (todoIndex > -1) {
        projects[projectIndex].tasks.splice(todoIndex, 1);
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
export function Todos() {
    return {
        createTodo() {
            return {
                placeTodo: placeTodo.value, // just added
                title: title.value,
                priority: priority.value.toLowerCase(),
                id: uuidv4(),
                completed: false,
                date: date.value,
            };
        },
    }
}