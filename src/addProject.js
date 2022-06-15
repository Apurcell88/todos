import { toggleInboxPopup, getSavedStorage } from "./inbox";
import { renderProjects } from "./addProjectDOM";
import { v4 as uuidv4 } from 'uuid';

export const addProjectNavBtn = document.querySelector('[data-add-project-nav-btn]');
const cancelProjectBtn = document.querySelector('[data-cancel-project-btn]');
export const projectInput = document.querySelector('[data-input-project-title]');

export let projects = getSavedStorage('projects');

renderProjects(projects);

// Factory function that creates projects
export function createProjects() {
    return {
        createProject() {
            projects.push({
                title: projectInput.value,
                tasks: [],
                id: uuidv4(),
            });
        }
    }
}

addProjectNavBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-add-project-popup]', addProjectNavBtn);
});

cancelProjectBtn.addEventListener('click', (e) => {
    toggleInboxPopup('[data-add-project-popup]', addProjectNavBtn);
});