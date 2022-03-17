const projectsContainer = document.querySelector('[data-projects-container]');

export function generateProjectDOM(project) {
    const individualProjectContainer = document.createElement('div');
    const projectEl = document.createElement('span');
    const deleteProjectBtn = document.createElement('button');

    projectEl.textContent = project.title;
    individualProjectContainer.appendChild(projectEl);

    deleteProjectBtn.textContent

    return individualProjectContainer;
}

export function renderProjects(projects) {
    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}