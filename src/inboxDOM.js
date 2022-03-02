import { todos, deleteTodo,  } from './inbox.js';

export const todosContainer = document.querySelector('#todos-display-container');

export function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
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

    dueDate.setAttribute('type', 'date');
    dueDate.classList.add('due-date');
    individualTodoContainer.appendChild(dueDate);
    dueDate.addEventListener('change', (e) => {
        dueDate.setAttribute('value', dueDate.value);
        console.log(dueDate.value);
    });
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

// renderTodos(todos);