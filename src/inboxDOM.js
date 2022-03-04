import { todos, deleteTodo,  } from './inbox.js';
import { format } from 'date-fns';

export const todosContainer = document.querySelector('#todos-display-container');
let dates = loadDate();

export function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// function saveDate(dueDate) {
//     localStorage.setItem('saveValue', JSON.stringify(dueDate.value));
// }

function saveDate() {
    localStorage.setItem('dates', JSON.stringify(dates));
}

function loadDate() {
    // const JSONdate = localStorage.getItem('saveValue');
    const JSONdate = localStorage.getItem('dates');

    if (JSONdate !== null) {
        return JSON.parse(JSONdate);
    } else {
        return [];
    }
    // return JSON.parse(localStorage.getItem('saveValue'));
}

export function generateTodoDOM(todo) {
    const individualTodoContainer = document.createElement('div');
    const todoEl = document.createElement('span');
    const markComplete = document.createElement('input');
    const completedText = document.createElement('span');
    const dueDate = document.createElement('input');

    todoEl.textContent = `${todo.title} Priority: ${todo.priority}`;
    todoEl.classList.add('todo-el');
    if (todo.priority === 'high') {
        todoEl.classList.add('red')
    }
    if (todo.priority === 'medium') {
        todoEl.classList.add('yellow')
    }
    if (todo.priority === 'low') {
            todoEl.classList.add('green')
    }
    individualTodoContainer.appendChild(todoEl);

    completedText.textContent = 'Completed?';
    individualTodoContainer.appendChild(completedText);

    // set up todo checkbox
    markComplete.setAttribute('type', 'checkbox');
    markComplete.classList.add('mark-complete');
    individualTodoContainer.appendChild(markComplete);
    markComplete.checked = todo.completed;
    markComplete.addEventListener('change', (e) => {
        deleteTodo(todo.id);
        saveTodo();
        renderTodos(todos);
    });

    // set up date input
    dueDate.setAttribute('type', 'date');
    dueDate.classList.add('due-date');
    individualTodoContainer.appendChild(dueDate);
    // dueDate.setAttribute('value', dueDate.value);
    // dueDate.setAttribute('value', todo.date);
    dueDate.addEventListener('change', (e) => {
        todo.date = dueDate.value;
        dueDate.setAttribute('value', todo.date);
        dates.push(todo.date);
        // saveDate(dueDate);
        saveDate();
        console.log(dueDate);
        console.log(dates);
    });
    dueDate.setAttribute('value', loadDate());
    // renderTodos(todos);

    return individualTodoContainer;
}

export function renderTodos(todos) {
    todosContainer.innerHTML = ''; 
    const incompleteTodos = todos.filter((todo) => {
        return !todo.completed;
    });
    
    incompleteTodos.forEach((todo) => {
        todosContainer.appendChild(generateTodoDOM(todo));
    });
};