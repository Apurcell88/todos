import { deleteItem, Todos } from "./inbox";
import { projects } from "./addProject";
import { saveToLocalStorage, inboxTitle, todosContainer, generateTodoDOM } from "./inboxDOM";

export let incompleteTodos = []; // now a global variable
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
        todosContainer.textContent = '';
        render(projects);
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

// export function render(todos) { // have to rework this to display proper todos for each project
//     todosContainer.innerHTML = '';

//     // let incompleteTodos = [];

//     for (let i = 0; i <= todos.length - 1; i++) {
//         todos[i].tasks.forEach((task) => {
//              incompleteTodos.push(task);
//         });
//     }

//     incompleteTodos.forEach((todo) => {
//         todosContainer.appendChild(generateTodoDOM(todo));
//     });
// };

export function render(projects, id) {
    const todo = Todos(); 

    todosContainer.innerHTML = '';

    const foundProject = projects.find((project) => {
        id === project.id;
    })
    console.log(foundProject); // undefined. Code above is wrong. Not finding the id

    projects.forEach((project) => {
        if (inboxTitle.textContent !== project.title) {
            inboxTitle.textContent = project.title;
        }

        foundProject.tasks.push(todo.createTodo());
        saveToLocalStorage('projects', projects);
        foundProject.tasks.forEach((task) => {
            incompleteTodos.push(task);
        });
    });

    incompleteTodos.forEach((todo) => {
        todosContainer.appendChild(generateTodoDOM(todo));
    });
};



// export function render(projects, projectId) {
//     const todo = Todos();
//     // todosContainer.innerHTML = '';

//     // let incompleteTodos = []; // make into a global variable?

//     let itemIndex;

//     projects.forEach((project) => {
        // if (project.id === projectId) {
        //    itemIndex = projects.findIndex((project) => {
        //         return project.id === projectId;
        //     });
        // }
//     });

//     console.log(itemIndex);
    
//     if (itemIndex > -1) {
//         // something is off here. The projects aren't being distinguished
//         if (inboxTitle.textContent !== projects[itemIndex].title) {
//             inboxTitle.textContent = projects[itemIndex].title;
//         }

//         projects[itemIndex].tasks.push(todo.createTodo());
//         saveToLocalStorage('projects', projects);
        
//         console.log(projects[itemIndex]);
//         projects[itemIndex].tasks.forEach((task) => {
//             incompleteTodos.push(task);
//         });
        

//         incompleteTodos.forEach((todo) => {
//             todosContainer.appendChild(generateTodoDOM(todo));
//         });
//     }

//     incompleteTodos.splice(0, incompleteTodos.length);
//     console.log(incompleteTodos);

    

//         // project.tasks.push(todo.createTodo());
//         // project.tasks.forEach((task) => {
//         //     incompleteTodos.push(task);
//         // });

//         // incompleteTodos.forEach((todo) => {
//         //     todosContainer.appendChild(generateTodoDOM(todo));
//         // });
// };