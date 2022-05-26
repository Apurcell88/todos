import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { toggleInboxPopup, Todos, title, priority, placeTodo, date } from './inbox.js';
import { todosContainer, saveToLocalStorage, inboxTitle } from './inboxDOM.js';
import { createProjects, projects, projectInput, addProjectNavBtn } from './addProject.js';
import { renderProjects, pushTodos } from './addProjectDOM';

export const addTaskBtn = document.querySelector('[data-toggle-task-btn]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const cancelTodoBtn = document.querySelector('[data-cancel-todo-btn]');
const addProjectBtn = document.querySelector('[data-add-project-btn]');

addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

addTodoBtn.addEventListener('click', (e) => {
    todosContainer.textContent = '';
    const todo = Todos();
    toggleInboxPopup('[data-task-popup]', addTaskBtn);

    pushTodos(projects);

    projects.filter((project) => {
        if (placeTodo.value === project.title) {
            project.tasks.push(todo.createTodo())
        }

        // inboxTitle.textContent = project.title;
    });
    saveToLocalStorage('projects', projects);
    
    placeTodo.value = '';
    title.value = '';
    priority.value = '';
    // date.value = '';
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
    renderProjects(projects);
    pushTodos(projects);
    inboxTitle.textContent = projectInput.value;
    projectInput.value = ''; 
});