import { toggleInboxPopup, getSavedStorage } from "./inbox";

export const addProjectNavBtn = document.querySelector('[data-add-project-nav-btn]');
export const addProjectBtn = document.querySelector('[data-add-project-btn]');
const cancelProjectBtn = document.querySelector('[data-cancel-project-btn]');
export const projectInput = document.querySelector('[data-input-project-title]');

export let projects = getSavedStorage('projects');

// Factory function that creates projects
export function createProjects() {
    return {
        createProject() {
            projects.push({
                title: projectInput.value,
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