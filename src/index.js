import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { toggleInboxPopup, inboxTodos, todos, title, priority } from './inbox.js';
import { displayTodo, todosContainer } from './inboxDOM.js';

const addTaskBtn = document.querySelector('#add-task-btn');
const addTodoBtn = document.querySelector('#add-btn');
const cancelTodoBtn = document.querySelector('#cancel-btn');

addTaskBtn.addEventListener('click', toggleInboxPopup
    
);

addTodoBtn.addEventListener('click', () => {
    todosContainer.textContent = '';
    const todo = inboxTodos();
    todo.createTodo();
    console.log(todos);
    toggleInboxPopup();
    displayTodo(todos);
    title.value = '';
    priority.value = '';
});

cancelTodoBtn.addEventListener('click', () => {
    toggleInboxPopup();
});

export default addTaskBtn;