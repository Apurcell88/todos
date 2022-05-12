import { deleteItem, Todos } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, todosContainer, generateTodoDOM } from "./inboxDOM";

export let incompleteTodos = []; // now a global variable.
// let itemIndex;

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
        // console.log(e.srcElement.textContent)
        todosContainer.textContent = '';
        render(projects);
        inboxTitle.textContent = project.title;

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
// export function render(todos) { // have to rework this to display proper todos for each project
//     todosContainer.innerHTML = '';

//     // let incompleteTodos = [];

    // for (let i = 0; i <= todos.length - 1; i++) {
    //     todos[i].tasks.forEach((task) => {
    //          incompleteTodos.push(task);
    //     });
    // }

    // incompleteTodos.forEach((todo) => {
    //     todosContainer.appendChild(generateTodoDOM(todo));
    // });
// };

export function renderProjects(projects) {
    const projectsContainer = document.querySelector('[data-projects-container]');

    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
        projectsContainer.appendChild(generateProjectDOM(project));
    });
}

export function render(projects) { // need to change function name as this doesn't render anyymore. Maybe call it pushTodos?
    todosContainer.innerHTML = '';

    // let incompleteTodos = []; // all of the todos get put here. Have to sort them into different projects. Need correlation between projects/project tasks. Todos go in the project.tasks

    for (let i = 0; i <= projects.length - 1; i++) {
        projects[i].tasks.forEach((task) => {
            // if (projects[i].tasks[index].includes(incompleteTodos)) {
            //     incompleteTodos.push(task);
            // }
            if (incompleteTodos.includes(task)) { // maybe change to ! and move the else statement into here?
                console.log('task already in array')
            }
             else {
                incompleteTodos.push(task);
            }
             
        });
    }

    console.log(incompleteTodos)

    // project.tasks.push(todo.createTodo())
    // incompleteTodos.push(todo.createTodo)
    // saveToLocalStorage('projects', projects);
}