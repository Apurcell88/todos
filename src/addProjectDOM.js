import { deleteItem, Todos } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, todosContainer, generateTodoDOM } from "./inboxDOM";

export let incompleteTodos = []; // now a global variable.

export function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    individualProjectContainer.classList.add('projects', 'show-display-flex', 'justify-content-space-between');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);
    projectEl.classList.add('enter-project-button');
    // below is more than likely wrong, but we can at least see some functionality
    projectEl.addEventListener('click', (e) => {
        // saveToLocalStorage('projects', projects); // just added
        todosContainer.textContent = '';
        pushTodos(projects);
        inboxTitle.textContent = e.srcElement.textContent;

        const specificTodos = incompleteTodos.filter((todo) => {
            if (e.srcElement.textContent === todo.placeTodo) {
                return todo.title
            }
        });

        specificTodos.forEach((todo) => {
            todosContainer.appendChild(generateTodoDOM(todo));
        });
    });

    deleteProjectBtn.textContent = 'X';
    individualProjectContainer.appendChild(deleteProjectBtn);
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.addEventListener('click', (e) => {
        todosContainer.innerHTML = '';
        inboxTitle.innerHTML = '';
        deleteItem(project.id, projects);
        saveToLocalStorage('projects', projects);
        renderProjects(projects, projects.title);
    });

    return individualProjectContainer;
}

export function renderProjects(projects) {
    const projectsContainer = document.querySelector('[data-projects-container]');

    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}

export function pushTodos(projects) {
    todosContainer.textContent = '';

    for (let i = 0; i <= projects.length - 1; i++) {
        projects[i].tasks.forEach((task) => {
            if (incompleteTodos.includes(task)) {
                // console.log('task already in array')
                return null;
            }
             else {
                incompleteTodos.push(task);
            }
             
        });
    }
}

export function render(projects) {
    // todosContainer.textContent = '';

    const specificTodos = incompleteTodos.filter((todo) => {
        // need the correct project todos to display
        // how do we target the correct project todos?
        const correctTodos = projects.find(project => project.title === todo.placeTodo); // this is returning all of the projects, not a specific one

        return correctTodos;
    });
    console.log(incompleteTodos);
    console.log(projects);
    // console.log(specificTodos);

    // specificTodos.forEach((todo) => {
    //     todosContainer.appendChild(generateTodoDOM(todo));
    // });
}