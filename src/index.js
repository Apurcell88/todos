import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todos, toggleInboxPopup, inboxTodos, title, priority } from './inbox.js';
import { renderTodos, todosContainer, saveTodo } from './inboxDOM.js';
import { addProjectNavBtn, addProject, cancelProject } from './addProject.js';

export const addTaskBtn = document.querySelector('#add-task-btn');
const addTodoBtn = document.querySelector('#add-btn');
const cancelTodoBtn = document.querySelector('#cancel-btn');
const inboxNavBtn = document.querySelector('[data-inbox]');

addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('#add-task-popup', addTaskBtn);
});

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    saveTodo();
    toggleInboxPopup('#add-task-popup', addTaskBtn);
    renderTodos(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    // const todo = inboxTodos()
    // todo.deleteTodo();
    toggleInboxPopup('#add-task-popup', addTaskBtn);
});

inboxNavBtn.addEventListener('click', (e) => {
    renderTodos(todos);
});

addProjectNavBtn.addEventListener('click', (e) => {
    toggleInboxPopup('#add-project-popup', addProjectNavBtn);
});

cancelProject.addEventListener('click', (e) => {
    toggleInboxPopup('#add-project-popup', addProjectNavBtn);
});