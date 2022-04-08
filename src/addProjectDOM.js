import { deleteItem } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, todosContainer, generateTodoDOM } from "./inboxDOM";

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
        render(project, project.id);
        inboxTitle.textContent = project.title;
        

        
    });

    deleteProjectBtn.textContent = 'X';
    individualProjectContainer.appendChild(deleteProjectBtn);
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.addEventListener('click', (e) => {
        todosContainer.innerHTML = '';
        inboxTitle.innerHTML = '';
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

// export function render(todos) { // have to rework this to display proper todos for each project
//     todosContainer.innerHTML = '';

//     let incompleteTodos = [];

//     for (let i = 0; i <= todos.length - 1; i++) {
//         todos[i].tasks.forEach((task) => {
//              incompleteTodos.push(task);
//         });
//     }

//     incompleteTodos.forEach((todo) => {
//         todosContainer.appendChild(generateTodoDOM(todo));
//     });
// };

export function render(project, projectId) {
    todosContainer.innerHTML = '';

    let incompleteTodos = [];

    if (project.id === projectId) {
        project.tasks.forEach((task) => {
            incompleteTodos.push(task);
        });
    }

    incompleteTodos.forEach((todo) => {
        todosContainer.appendChild(generateTodoDOM(todo));
    });

    incompleteTodos.splice(0, incompleteTodos.length);
};