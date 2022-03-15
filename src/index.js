import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todos, toggleInboxPopup, inboxTodos, title, priority } from './inbox.js';
import { renderTodos, todosContainer, saveTodo } from './inboxDOM.js';
import { addProjectNavBtn, addProject, cancelProject } from './addProject.js';

export const addTaskBtn = document.querySelector('[data-toggle-task-btn]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const cancelTodoBtn = document.querySelector('[data-cancel-todo-btn]');
const inboxNavBtn = document.querySelector('[data-inbox]');

addTaskBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    saveTodo();
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
    renderTodos(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    // const todo = inboxTodos()
    // todo.deleteTodo();
    toggleInboxPopup('[data-task-popup]', addTaskBtn);
});

inboxNavBtn.addEventListener('click', (e) => {
    renderTodos(todos);
});