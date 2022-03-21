import { deleteItem } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, renderTodos } from "./inboxDOM";

// let projectTodos;

export function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('button');
    const deleteProjectBtn = document.createElement('button');

    individualProjectContainer.classList.add('projects', 'show-display-flex', 'justify-content-space-between');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);
    projectEl.classList.add('enter-project-button');
    projectEl.addEventListener('click', (e) => {
        inboxTitle.textContent = project.title;
        // have to change which local storage appears on screen
        
    });

    deleteProjectBtn.textContent = 'X';
    individualProjectContainer.appendChild(deleteProjectBtn);
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.addEventListener('click', (e) => {
        deleteItem(project.id, projects);
        saveToLocalStorage('projects', projects);
        renderProjects(projects);
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