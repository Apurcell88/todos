import { deleteItem } from './inbox.js';
import { projects, projectInput } from './addProject.js';
import { render } from './addProjectDOM.js';

export const todosContainer = document.querySelector('#todos-display-container');
export const inboxTitle = document.querySelector('[data-project-title-text]');

export function saveToLocalStorage(key, stringifyVar) {
    localStorage.setItem(key, JSON.stringify(stringifyVar));
}

function deleteTodo(todoId, projectId, projects) {
    // more than likely gonna have to change this later.
    let itemIndex = 0;

    projects.forEach((project) => {
        if (project.id === projectId) {
            itemIndex = project.tasks.findIndex((todo) => {
                return todo.id === todoId;
            });
        }
    });

    console.log(itemIndex);

    if (itemIndex > -1) {
        projects.forEach((project) => {
            project.tasks.splice(itemIndex, 1);
        })
    }
}

export function generateTodoDOM(todo) {
    const individualTodoContainer = document.createElement('div');
    const todoEl = document.createElement('span');
    const markComplete = document.createElement('input');
    const completedText = document.createElement('span');
    const dateDue = document.createElement('p');

    inboxTitle.textContent = projectInput.value;

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
        deleteTodo(todo.id, projects.id, projects);
        saveToLocalStorage('projects', projects);
        render(projects);
        projects.forEach((project) => {
            inboxTitle.textContent = project.title;
        });
    });

    dateDue.textContent = `Due by ${todo.date}`
    individualTodoContainer.appendChild(dateDue);
    dateDue.classList.add('todo-el');

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