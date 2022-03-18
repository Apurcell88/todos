import { deleteItem } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage } from "./inboxDOM";

const projectsContainer = document.querySelector('[data-projects-container]');

export function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('span');
    const deleteProjectBtn = document.createElement('button');

    individualProjectContainer.classList.add('projects', 'show-display-flex', 'justify-content-space-between');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);

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
    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}