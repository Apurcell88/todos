export const individualTodoContainer = document.querySelector('#individual-todo-container');
const todoContainer = document.querySelector('#todos-display-container');

export function displayTodo(todos) {
    todos.forEach((todo) => {
        const completedTodoCheckbox = document.createElement('input');
        completedTodoCheckbox.setAttribute('type', 'checkbox');
        individualTodoContainer.appendChild(completedTodoCheckbox);
        todoContainer.appendChild(individualTodoContainer);

        const todoEl = document.createElement('span');
        todoEl.textContent = `${todo.title} Priority: ${todo.priority}`;
        individualTodoContainer.appendChild(todoEl);
        todoContainer.appendChild(individualTodoContainer);
    });
}