import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { toggleInboxPopup, Todos, title, priority, date } from './inbox.js';
import { renderTodos, todosContainer, saveToLocalStorage } from './inboxDOM.js';
import { createProjects, projects, projectInput, addProjectNavBtn, cancelProject } from './addProject.js';
import { renderProjects, render } from './addProjectDOM';

export const addTaskBtn = document.querySelector('[data-toggle-task-btn]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const cancelTodoBtn = document.querySelector('[data-cancel-todo-btn]');
const inboxNavBtn = document.querySelector('[data-inbox]');
const addProjectBtn = document.querySelector('[data-add-project-btn]');

// Default inbox load
addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

// something might be off here?
addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = Todos();
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
    // renderProjects(projects);
    projects.forEach((project) => {
        project.tasks.push(todo.createTodo())
        saveToLocalStorage('projects', projects);
    });
    // renderTodos(projects);
    renderTodos(projects);
    render(projects);
    // inboxTitle.textContent = projects.title;
    title.value = '';
    priority.value = '';
    date.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

// inboxNavBtn.addEventListener('click', (e) => {
//     renderTodos(todos);
// });


// Adding projects
addProjectBtn.addEventListener('click', (e) => {
    // set up project
    const project = createProjects();
    project.createProject();
    saveToLocalStorage('projects', projects);
    toggleInboxPopup('[data-add-project-popup]', addProjectNavBtn);
    renderProjects(projects);
    projectInput.value = '';
    console.log(projects);
});