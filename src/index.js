import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { toggleInboxPopup, inboxTodos, todos, title, priority } from './inbox.js';
import { displayTodo, todosContainer } from './inboxDOM.js';

export const addTaskBtn = document.querySelector('#add-task-btn');
const addTodoBtn = document.querySelector('#add-btn');
const cancelTodoBtn = document.querySelector('#cancel-btn');
export const deleteTodoBtn = document.querySelector('#delete-todo');

addTaskBtn.addEventListener('click', toggleInboxPopup
    
);

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    // todo.addClass();
    toggleInboxPopup();
    displayTodo(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    const todo = inboxTodos()
    todo.deleteTodo();
    toggleInboxPopup();
});

// export default addTaskBtn;