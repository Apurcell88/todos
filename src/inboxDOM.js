import { deleteTodo, getSavedStorage } from './inbox.js';
import { projects, projectInput } from './addProject.js';
import { incompleteTodos, pushTodos, render } from './addProjectDOM.js';

export const todosContainer = document.querySelector('#todos-display-container');
export const inboxTitle = document.querySelector('[data-project-title-text]');

export function saveToLocalStorage(key, stringifyVar) {
    localStorage.setItem(key, JSON.stringify(stringifyVar));
}

export function generateTodoDOM(todo) {
    const individualTodoContainer = document.createElement('div');
    const todoEl = document.createElement('span');
    const markComplete = document.createElement('input');
    const completedText = document.createElement('span');
    // const dateDue = document.createElement('p');

    todoEl.textContent = `${todo.title} Priority: ${todo.priority}`; 
    todoEl.classList.add('todo-el');
    if (todo.priority === 'high') {
        todoEl.classList.add('red')
    }
    if (todo.priority === 'medium') {
        todoEl.classList.add('yellow')
    }
    if (todo.priority === 'low') {
            todoEl.classList.add('green')
    }
    individualTodoContainer.appendChild(todoEl);

    completedText.textContent = 'Completed?';
    individualTodoContainer.appendChild(completedText);

    // set up todo checkbox
    markComplete.setAttribute('type', 'checkbox');
    markComplete.classList.add('mark-complete');
    individualTodoContainer.appendChild(markComplete);
    markComplete.checked = todo.completed;
    markComplete.addEventListener('change', (e) => {
        pushTodos(projects);

        projects.filter((project) => {
            deleteTodo(todo.id, project.id); // this works. It deletes the correct todo.
            saveToLocalStorage('projects', projects);
            render(project.id, todo.placeTodo); // this will load the page with the correct todos
            // location.reload(); // refreshes the web page
        });
    });

    // dateDue.textContent = `Due by ${todo.date}`
    // individualTodoContainer.appendChild(dateDue);
    // dateDue.classList.add('todo-el');

    return individualTodoContainer;
}