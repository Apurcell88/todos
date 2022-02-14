import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { loadInboxPopup, inboxTodos, todos } from './inbox.js';

const addTaskBtn = document.querySelector('#add-task-btn');
const addTodoBtn = document.querySelector('#add-btn');

addTaskBtn.addEventListener('click', (e) => {
    loadInboxPopup();
});

addTodoBtn.addEventListener('click', (e) => {
    const todo = inboxTodos();
    todo.createTodo();
    console.log(todo);
    // console.log(todos);
})

export default addTaskBtn;