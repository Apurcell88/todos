import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { toggleInboxPopup, Todos, title, priority, date } from './inbox.js';
import { todosContainer, saveToLocalStorage, inboxTitle } from './inboxDOM.js';
import { createProjects, projects, projectInput, addProjectNavBtn } from './addProject.js';
import { renderProjects, render } from './addProjectDOM';

export const addTaskBtn = document.querySelector('[data-toggle-task-btn]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const cancelTodoBtn = document.querySelector('[data-cancel-todo-btn]');
// const inboxNavBtn = document.querySelector('[data-inbox]');
const addProjectBtn = document.querySelector('[data-add-project-btn]');

// Default inbox load
addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

addTodoBtn.addEventListener('click', () => {
    // todosContainer.textContent = '';
    const todo = Todos();
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
    projects.forEach((project) => {
        if (inboxTitle.textContent !== project.title) {
            inboxTitle.textContent = project.title;
        }
        project.tasks.push(todo.createTodo())
        saveToLocalStorage('projects', projects);
        render(project, project.id);
    });
    
    // keep an eye on the forEach loop below. Might do unwanted things down the line
    // projects.forEach((project) => {
    //     if (inboxTitle.textContent !== project.title) {
    //         inboxTitle.textContent = project.title;
    //     }
    // });
    title.value = '';
    priority.value = '';
    date.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

// Adding projects
addProjectBtn.addEventListener('click', (e) => {
    // set up project
    const project = createProjects();
    project.createProject();
    saveToLocalStorage('projects', projects);
    toggleInboxPopup('[data-add-project-popup]', addProjectNavBtn);
    // renderProjects(projects);
    projects.forEach((project) => {
        render(project, project.id);
    })
    inboxTitle.textContent = projectInput.value;
    projectInput.value = ''; 
    console.log(projects);
});