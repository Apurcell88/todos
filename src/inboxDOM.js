import { deleteTodo } from './inbox.js';
import { projects, projectInput } from './addProject.js';
import { render } from './addProjectDOM.js';

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

    inboxTitle.textContent = projectInput.value;

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
        deleteTodo(todo.id, projects.id, projects); // something going on with this function?
        saveToLocalStorage('projects', projects);
        // render(projects);
        projects.forEach((project) => {
            inboxTitle.textContent = project.title;
            render(projects);
        });
    });

    // dateDue.textContent = `Due by ${todo.date}`
    // individualTodoContainer.appendChild(dateDue);
    // dateDue.classList.add('todo-el');

    return individualTodoContainer;
}