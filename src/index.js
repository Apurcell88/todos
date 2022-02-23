import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { todos, toggleInboxPopup, inboxTodos, title, priority } from './inbox.js';
import { renderTodos, todosContainer } from './inboxDOM.js';

export const addTaskBtn = document.querySelector('#add-task-btn');
const addTodoBtn = document.querySelector('#add-btn');
const cancelTodoBtn = document.querySelector('#cancel-btn');
// export const deleteTodoBtn = document.querySelector('#delete-todo');

addTaskBtn.addEventListener('click', toggleInboxPopup
    
);

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    // todo.addClass();
    toggleInboxPopup();
    renderTodos(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    const todo = inboxTodos()
    // todo.deleteTodo();
    toggleInboxPopup();
});