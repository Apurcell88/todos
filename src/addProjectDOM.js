import { deleteItem, deleteTodo, Todos } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, todosContainer, generateTodoDOM } from "./inboxDOM";

export let incompleteTodos = [];

export function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    individualProjectContainer.classList.add('projects', 'show-display-flex', 'justify-content-space-between');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);
    projectEl.classList.add('enter-project-button');
    projectEl.addEventListener('click', (e) => {
        todosContainer.textContent = '';
        pushTodos(projects);
        inboxTitle.textContent = e.srcElement.textContent;

        const specificTodos = incompleteTodos.filter((todo) => {
            if (e.srcElement.textContent === todo.placeTodo) {
                return todo.title
            }
        });

        specificTodos.filter((todo) => {
            render(project.id, todo.placeTodo);
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
                return null;
            }
             else {
                incompleteTodos.push(task);
            }
        });
    }
}

export function render(projectId, todoPlace) {
    todosContainer.innerHTML = '';
    
    const projectIndex = projects.findIndex((project) => {
        return project.id === projectId // gives a specific project
    });

    if (projects[projectIndex].title === todoPlace) {
        
        projects[projectIndex].tasks.forEach((task) => {
            todosContainer.appendChild(generateTodoDOM(task))
        });
    }
}