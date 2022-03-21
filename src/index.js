import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todos, toggleInboxPopup, inboxTodos, title, priority } from './inbox.js';
import { renderTodos, todosContainer, saveToLocalStorage } from './inboxDOM.js';
import { createProjects, projects, projectInput, addProjectNavBtn, cancelProject } from './addProject.js';
import { renderProjects } from './addProjectDOM';

export const addTaskBtn = document.querySelector('[data-toggle-task-btn]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const cancelTodoBtn = document.querySelector('[data-cancel-todo-btn]');
const inboxNavBtn = document.querySelector('[data-inbox]');
const addProjectBtn = document.querySelector('[data-add-project-btn]');

// Default inbox load
addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    saveToLocalStorage('todos', todos);
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
    renderTodos(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

inboxNavBtn.addEventListener('click', (e) => {
    renderTodos(todos);
});


// Adding projects
addProjectBtn.addEventListener('click', (e) => {
    // set up project
    const project = createProjects();
    project.createProject();
    saveToLocalStorage('projects', projects);
    toggleInboxPopup('[data-add-project-popup]', addProjectNavBtn);
    renderProjects(projects);
    projectInput.value = '';

    // set up todos for the project
    const todo = inboxTodos();
    todo.createTodo();
    // saveToLocalStorage(`'${todo.}'`)
});